import React from "react";

const PurchaseOverview = () => {
  return (
    <div className="container mx-auto p-4 bg-white rounded-md mt-4">
      {/* Account Overview Title */}
      <h2 className="text-2xl font-semibold mb-4">Purchase Overview</h2>

      {/* Grid of 4 Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Column 1: Account */}
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">👤</div>
          <div className="text-lg font-medium">100</div>
          <div className="text-sm text-gray-500">Purchase</div>
        </div>

        {/* Column 2: Ban */}
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">🚫</div>
          <div className="text-lg font-medium">5</div>
          <div className="text-sm text-gray-500">Cost</div>
        </div>

        {/* Column 3: Partner */}
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">🤝</div>
          <div className="text-lg font-medium">12</div>
          <div className="text-sm text-gray-500">Cancel</div>
        </div>

        {/* Column 4: Feedback */}
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">💬</div>
          <div className="text-lg font-medium">250</div>
          <div className="text-sm text-gray-500">Returns</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOverview;
