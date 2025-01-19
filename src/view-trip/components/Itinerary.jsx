import React from "react";
import PlaceCard from "./PlaceCard";

function Itinerary({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index}>
            <h2 className="font-medium text-lg"> Day: {item.day}</h2>
            {item.places.map((place, index) => (
              <div key={index} className="my-3">
                <h2 className="font-medium text-sm text-orange-700">
                  {place.bestTimeToVisit}
                </h2>
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
