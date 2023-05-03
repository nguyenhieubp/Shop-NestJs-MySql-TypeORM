import Detail from "@/component/detail/Detail";
import Layout from "@/component/detail/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const { product } = router.query;
  return (
    <>
      <Head>
        <title>{product}</title>
      </Head>
      <Detail></Detail>
    </>
  );
};

export default index;
