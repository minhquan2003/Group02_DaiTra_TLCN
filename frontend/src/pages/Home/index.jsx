import React from "react";
import ListProductCard from "../../components/Home/ListProductCard";

const HomePage = () => {
    return (
        <div className="w-screen h-auto flex flex-col justify-center items-center bg-main overflow-x-hidden">
            <ListProductCard />
        </div>
    );
};

export default HomePage;