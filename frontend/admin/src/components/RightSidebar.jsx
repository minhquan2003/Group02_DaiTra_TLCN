import React from "react";
import DeliveryOverview from "./ui/DeliveryOverview";
import ProductOverview from "./ui/ProductOverview";

const RightSidebar = () => {
  return (
    <div className="fixed top-16 right-0 w-1/4 h-[calc(100%-4rem)] p-4 overflow-y-auto">
      <DeliveryOverview />
      <ProductOverview />
    </div>
  );
};

export default RightSidebar;
