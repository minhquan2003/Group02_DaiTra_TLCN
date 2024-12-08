import React, { useState, useEffect, useRef } from "react";
import { useTopSellingProducts } from "../../hooks/useOrder";
import { FiFilter } from "react-icons/fi";

const TopTenOrder = () => {
  const [timeFrame, setTimeFrame] = useState("month"); // Default is "month"
  const { topProducts, loading, error } = useTopSellingProducts(timeFrame);
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Toggle filter menu visibility
  const filterMenuRef = useRef(null);
  const filterButtonRef = useRef(null);

  const handleFilterClick = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame); // Change the time frame when selecting
    setShowFilterMenu(false); // Close the filter menu after selection
  };

  // Close filter menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to return the title based on timeFrame
  const getTitle = () => {
    switch (timeFrame) {
      case "day":
        return "Top 10 Products Today";
      case "week":
        return "Top 10 Products This Week";
      case "month":
        return "Top 10 Products This Month";
      case "year":
        return "Top 10 Products This Year";
      default:
        return "Top 10 Products";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg ">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{getTitle()}</h2>
      {/* Title changes based on timeFrame */}
      {/* Filter Icon */}
      <div className="relative">
        <button
          onClick={handleFilterClick}
          ref={filterButtonRef}
          className="text-xl mb-4 text-orange-600 bg-orange-100 p-1 rounded-lg"
          aria-label="Filter by time frame"
        >
          <FiFilter />
        </button>

        {/* Dropdown Menu for Time Frames */}
        {showFilterMenu && (
          <div
            ref={filterMenuRef}
            className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          >
            <ul className="space-y-2 p-2">
              <li>
                <button
                  onClick={() => handleTimeFrameChange("day")}
                  className="text-gray-700 hover:bg-gray-200 px-4 py-2 w-full text-left text-sm"
                >
                  Today
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTimeFrameChange("week")}
                  className="text-gray-700 hover:bg-gray-200 px-4 py-2 w-full text-left text-sm"
                >
                  This Week
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTimeFrameChange("month")}
                  className="text-gray-700 hover:bg-gray-200 px-4 py-2 w-full text-left text-sm"
                >
                  This Month
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTimeFrameChange("year")}
                  className="text-gray-700 hover:bg-gray-200 px-4 py-2 w-full text-left text-sm"
                >
                  This Year
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Loading/Error State */}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {/* Product List */}
      {!loading && !error && (
        <ul className="divide-y divide-gray-200">
          {topProducts.map((product) => (
            <li key={product.productId} className="flex items-center py-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-gray-600 text-sm">
                  Sold: {product.totalQuantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopTenOrder;
