// Layout.tsx
import Footer from "../comon/Footer";
import Header from "../comon/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
