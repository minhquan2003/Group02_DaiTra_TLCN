import React from "react";
import { BsCartCheck, BsCartX } from "react-icons/bs";
import { BiCoinStack } from "react-icons/bi";
import { MdShoppingCartCheckout } from "react-icons/md";
import { usePurchaseOverview } from "../../hooks/useOrder";

const PurchaseOverview = () => {
  const { overviewData, loading, error } = usePurchaseOverview();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Purchase Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="text-2xl mb-4 text-violet-600 bg-violet-100 p-1 rounded-lg">
            <MdShoppingCartCheckout />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">
              {overviewData.totalOrders}
            </div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="text-2xl mb-4 text-yellow-500 bg-yellow-100 p-1 rounded-lg">
            <BiCoinStack />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">{overviewData.totalMoney}</div>
            <div className="text-sm text-gray-500">Total Amount</div>
          </div>
        </div>

        {/* Total Cancelled Orders */}
        <div className="flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="text-2xl mb-4 text-rose-500 bg-rose-100 p-1 rounded-lg">
            <BsCartX />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">
              {overviewData.totalCancelled}
            </div>
            <div className="text-sm text-gray-500">Cancelled Orders</div>
          </div>
        </div>

        {/* Additional Column */}
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-4 text-teal-600 bg-teal-100 p-1 rounded-lg">
            <BsCartCheck />
          </div>
          <div className="flex text-center items-center space-x-6">
            <div className="text-lg font-medium">
              {overviewData.totalSuccessful}
            </div>
            <div className="text-sm text-gray-500">Successfull Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOverview;
