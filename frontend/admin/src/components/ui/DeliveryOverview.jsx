import React from "react";

const DeliveryOverview = () => {
  return (
    <div className="container mx-auto p-4 bg-white rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Delivery</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <i className="text-4xl text-gray-600">📦</i>
          </div>
          <div className="text-lg font-medium">50</div>
          <div className="text-sm text-gray-500">Quantity in Hand</div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <i className="text-4xl text-gray-600">📦</i>
          </div>
          <div className="text-lg font-medium">30</div>
          <div className="text-sm text-gray-500">To be received</div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOverview;
