import Head from "next/head";
import Image from "next/image";
import logo from "../images/wknd-logo-dk.svg";

const Layout = ({ children }) => (
    <>
        <Head>
            <title>WKND</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="App">
            <header>
                <Image src={logo} className="logo" alt="WKND Logo" />
                <hr />
            </header>
            {children}
        </div>
    </>
);

export default Layout;