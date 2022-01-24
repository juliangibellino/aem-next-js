import { async } from "regenerator-runtime";

const {
    REACT_APP_HOST_URI,
    REACT_APP_GRAPHQL_ENDPOINT,
    REACT_APP_AUTHORIZATION,
} = process.env;

// parse the items and set the absolute image path as a temp patch to test locally
function parseImage(image) {
    return {
        ...image,
        src: `http://admin:admin@localhost:4502${image._path}`,
    };
}

async function fetchAPI(query, { variables } = {}) {
    const headers = { "Content-Type": "application/json" };
    const endpoint = REACT_APP_HOST_URI + REACT_APP_GRAPHQL_ENDPOINT;

    if (process.env.REACT_APP_AUTHORIZATION) {
        headers["Authorization"] = `Basic ${btoa(REACT_APP_AUTHORIZATION)}`;
    }

    const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed to fetch API");
    }
    return json.data;
}

export async function getAllPostsForHome(preview) {
    const data = await fetchAPI(`
    {
        adventureList {
        items {
            _path
            adventureTitle
            adventurePrice
            adventureTripLength
            adventurePrimaryImage {
            ... on ImageRef {
                _path
                mimeType
                width
                height
            }
            }
        }
        }
    }
    `);

    if (data.adventureList?.items) {
        data.adventureList.items = data.adventureList?.items.map((item) => ({
            ...item,
            adventurePrimaryImage: parseImage(item.adventurePrimaryImage),
            path: item._path.split("/content/dam/wknd/en/adventures")[1],
        }));
    }

    return data;
}

export async function getAllAdventurePaths() {
    const data = await fetchAPI(`
    {
            adventureList {
            items {
                _path
            }
        }
    }
    `);

    return data.adventureList.items.map(
        (item) =>
            `/adventures${
                item._path.split("/content/dam/wknd/en/adventures")[1]
            }`
    );
}

export async function getAdventureDetail(adventure, slug) {
    // setting the absolute path to the adventures directory for demo
    const data = await fetchAPI(`{
    adventureByPath (_path: "/content/dam/wknd/en/adventures/${adventure}/${slug}") {
      item {
        _path
          adventureTitle
          adventureActivity
          adventureType
          adventurePrice
          adventureTripLength
          adventureGroupSize
          adventureDifficulty
          adventurePrice
          adventurePrimaryImage {
            ... on ImageRef {
              _path
              mimeType
              width
              height
            }
          }
          adventureDescription {
            html
          }
          adventureItinerary {
            html
          }
      }
    }
  }
  `);
    let item = data.adventureByPath?.item || {};

    if (item) {
        item = {
            ...item,
            adventurePrimaryImage: parseImage(item.adventurePrimaryImage),
        };
    }

    return item;
}
