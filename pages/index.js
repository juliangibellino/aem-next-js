// Libs
import { getAllPostsForHome } from "../lib/api";

// Components
import Layout from "../components/Layout";
import Adventures from "../components/Adventures";

export default function Home({ allPosts } = {}) {
    const { adventureList = {} } = allPosts;
    return (
        <Layout>
            <div>
                <h1>Title</h1>
                <Adventures adventureList={adventureList} />
            </div>
        </Layout>
    );
}

export async function getStaticProps({ preview = false }) {
    const allPosts = await getAllPostsForHome(preview);

    return {
        props: { allPosts, preview },
    };
}
