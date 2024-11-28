import React from "react";
import ListProductCard from "../../components/Home/ListProducts/ListProductCard";
import ListCategories from "../../components/Home/Categories/ListCategories";

const HomePage = () => {
  return (
    <div className="w-screen h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
      <ListCategories />
      <ListProductCard />
    </div>
  );
};

export default HomePage;
