import React from "react";

const OverLay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#9393936c]">
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  );
};

export default OverLay;
