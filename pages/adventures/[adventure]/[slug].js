import { getAllAdventurePaths, getAdventureDetail } from "../../../lib/api";
import AdventureDetail from "../../../components/AdventureDetail";
import Layout from "../../../components/Layout";

const Adventure = ({ adventure }) => (
    <Layout>
        <AdventureDetail adventureData={adventure} />
    </Layout>
);

export default Adventure;

export async function getStaticProps({ params }) {
    const adventure = await getAdventureDetail(params.adventure, params.slug);

    return {
        props: {
            adventure,
        },
    };
}

export async function getStaticPaths() {
    const allPaths = await getAllAdventurePaths();

    return {
        paths: allPaths || [],
        fallback: true,
    };
}
