import React from "react";

function Features() {
  return (
    <div className="mt-[90vh]">
      <div className="w-full grid place-items-center p-10">
        <h2 className="text-2xl font-bold pb-5">We Offer Best Services</h2>
        <div className="flex gap-10 mt-10 lg:gap-20">
          <div className="grid place-items-center w-[200px] h-[200px] ">
            <img src="/icons/tour-guide.png" className="w-[50px]" />
            <h2 className="text-xl font-medium">Guided Tour</h2>
            <p className="text-center">
              Explore AI-crafted itineraries with our personalized guided tour
              feature!
            </p>
          </div>
          <div className="grid place-items-center w-[200px] h-[200px] ">
            <img src="/icons/travelling.png" className="w-[50px]" />
            <h2 className="text-xl font-medium">Best Options</h2>
            <p className="text-center">
              Discover the best options tailored to your travel preferences!
            </p>
          </div>
          <div className="grid place-items-center w-[200px] h-[200px] ">
            <img src="/icons/medical-team.png" className="w-[50px]" />
            <h2 className="text-xl font-medium">Tavel Insurance</h2>
            <p className="text-center">
              Secure your journey with comprehensive travel insurance coverage
              today!
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Features;
