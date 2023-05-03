import Home from "@/component/Home/Home";
import Head from "next/head";

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Home></Home>
      </div>
    </>
  );
};

export default IndexPage;
