import React from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import Main from "./Main";

const Detail = () => {
  return (
    <Layout>
      <div className="px-[8rem] bg-[#eae8e9] py-[4rem]">
        <Main></Main>
      </div>
    </Layout>
  );
};

export default Detail;
