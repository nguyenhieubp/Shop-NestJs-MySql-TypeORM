// Layout.tsx
import Footer from "../comon/Footer";
import Header from "../comon/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <main className="px-[6rem] py-[4rem]">{children}</main>
    </>
  );
};

export default Layout;
