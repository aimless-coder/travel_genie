/* eslint-disable react/prop-types */
import PlaceCard from "./PlaceCard";

function Itinerary({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div className="relative py-5">
        <div className="absolute left-5 top-0 w-1 h-full border-l-2 border-orange-500 border-dashed"></div>

        {trip?.tripData?.tripDetail?.itinerary?.map((item, index) => (
          <div key={index} className="flex flex-col items-start mb-8 relative">
            <div className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full z-10 absolute left-0">
              {item.dayNumber.toString().padStart(2, "0")}
            </div>
            <div className="ltr ps-14 py-1">
              <h2 className="font-medium text-lg"> Day: {item.dayNumber} <span>{item.theme}</span></h2>
              {item.places.map((place, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-orange-700">
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
