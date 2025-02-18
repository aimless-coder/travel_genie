/* eslint-disable react/prop-types */
import { useEffect } from "react";
import PlaceCard from "./PlaceCard";

function Itinerary({ trip }) {
  useEffect(() => {}, [trip]);

  return (
    <div className="min-w-full">
      <h2 className="font-bold text-xl mt-1.5 mb-2">Itinerary</h2>
      <div className="flex flex-col gap-5">
        {trip?.tripData?.itinerary?.map((day, index) => (
          <div key={index} className="border rounded-lg p-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Day {day.dayNumber}</h2>
              <h2 className="text-gray-500">{day.theme}</h2>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {day.places.map((place, placeIndex) => (
                <PlaceCard key={placeIndex} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
