import { GetPlaceDetails, PHOTO_REF } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  const getPlacePhoto = async () => {
    try {
      const hotelText = hotel.hotelName;
      const data = {
        textQuery: hotelText,
      };

      const result = await GetPlaceDetails(data);
      const photoUrlVar = PHOTO_REF.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrlVar);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          className="rounded-lg h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">{hotel?.hotelAddress}</h2>
          <h2 className="text-xs">{hotel?.price}</h2>
          <h2 className="text-xs">{hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
