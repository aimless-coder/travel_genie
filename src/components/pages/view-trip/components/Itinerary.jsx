/* eslint-disable react/prop-types */
import { useEffect } from "react";
import PlaceCard from "./PlaceCard";

function Itinerary({ trip }) {
  useEffect(() => {}, [trip])
  return (
    <div className="min-w-full">
      <h2 className="font-bold text-lg mb-5">Places to Visit</h2>

      <div className="relative py-5 max-w-full">

        <div className="absolute left-5 top-0 w-1 h-full border-l-2 border-[#4b164c] border-dashed"></div>

        {trip?.tripData?.tripDetail?.itinerary?.map((item, index) => (
          <div key={index} className="w-full flex flex-col items-start mb-8 relative">
            <div className="w-10 h-10 flex items-center justify-center bg-[#4b164c] text-white font-bold rounded-xl z-10 absolute left-0">
              {item.dayNumber.toString().padStart(2, "0")}
            </div>
            <div className="ltr ps-14 py-1 w-full">
              <h2 className="font-medium text-lg"> Day: {item.dayNumber} <span>{item.theme}</span></h2>
              {item.places.map((place, index) => (
                <div key={index} className="my-3 w-full">
                  <h2 className="font-medium text-sm text-[#4b164c]">
                    {place.bestTimeToVisit}
                  </h2>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
