import { GetPlaceDetails, PHOTO_REF } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const getPlacePhoto = async () => {
    try {
      const location = trip?.userSelection?.location?.label;
      const data = {
        textQuery: location,
      };

      const result = await GetPlaceDetails(data);

      const photoUrlVar = PHOTO_REF.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrlVar);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <div>
      <img
        src={photoUrl}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            {trip?.userSelection?.noOfDays} Day
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            {trip?.userSelection?.noOfPeople} people
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
