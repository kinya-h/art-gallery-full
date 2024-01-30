import React from "react";
import CategoryFilter from "../components/CategoryFilter";
import Hero from "../components/Hero";
import Cta from "../components/Cta";

const Landing = () => {
  return (
    <div className="mt-20">
      {/* Filter  */}
      <div>
        <div className="flex justify-end">
          <div className="absolute z-50">
            <CategoryFilter />
          </div>
        </div>
        <Hero />

        <Cta />
      </div>
    </div>
  );
};

export default Landing;
