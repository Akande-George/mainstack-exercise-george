import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#EFF1F6] border-t-[#FF5403]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-[#FF5403] rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-[#131316] text-xl font-semibold">Loading...</div>
        <div className="text-[#56616B] text-sm">
          Please wait while we fetch your data
        </div>
      </div>
    </div>
  );
};

export default Loader;
