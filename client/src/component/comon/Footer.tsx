// Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white ">
      <div className="container mx-auto px-4 py-2">
        <p className="text-center">
          &copy; {new Date().getFullYear()} My Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
