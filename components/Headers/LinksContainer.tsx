import Image from "next/image";
import React from "react";

const LinksContainer = () => {
  return (
    <div className="space-y-8 shadow-md px-3 py-4 rounded-t-full rounded-b-full">
      <Image src="/link-wb.svg" alt="link" width={24} height={24} />
      <Image src="/products-wb.svg" alt="link" width={24} height={24} />
      <Image src="/folder-wb.svg" alt="link" width={24} height={24} />
      <Image src="/paper-wb.svg" alt="link" width={24} height={24} />
    </div>
  );
};

export default LinksContainer;
