import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  React.useEffect(() => {
    const myCookie = document.cookie;
    const token = myCookie.split("=")[1];
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full  bg-gradient-to-br from-sky-50 to-gray-200 ">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40 mt-[20rem]">
        <div className=" m-auto md:w-8/12 lg:w-6/12 xl:w-6/12 ">
          <div className="h-[40rem] rounded-xl bg-white shadow-xl">
            <div className="p-16 sm:p-16">
              <div className="space-y-4">
                <Link href={"/"}>
                  <Image
                    alt="Mô tả hình ảnh"
                    width={20}
                    height={20}
                    objectFit="contain"
                    src="https://tailus.io/sources/blocks/social/preview/images/icon.svg"
                    loading="lazy"
                    // className="w-10"
                  />
                </Link>
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Sign in to unlock the <br /> best of Tailus.
                </h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <Link href={"http://localhost:3000/auth/facebook"}>
                  <button className="group h-[4rem] px-10 border-2 border-gray-300 rounded-full transition duration-300  hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                    <div className="relative flex items-center space-x-4 justify-center">
                      <Image
                        alt="Mô tả hình ảnh"
                        width={20}
                        height={20}
                        objectFit="contain"
                        src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                        loading="lazy"
                        className="w-10"
                      />
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with Facebook
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{" "}
                  and confirm you have read our{" "}
                  <a href="#" className="underline">
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
                <p className="text-xs">
                  This site is protected by reCAPTCHA and the{" "}
                  <a href="#" className="underline">
                    Google Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
