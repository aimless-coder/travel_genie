import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  const getPlacePhoto = async () => {
    try {
      const placeText = place.placeName;
      const data = {
        textQuery: placeText,
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
    place && getPlacePhoto();
  }, [place]);
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="shadow-md rounded-xl p-5 mt-2 flex gap-5 items-center hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
        <img
          src={photoUrl}
          className="w-[100px] h-[100px] rounded-xl object-cover"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-gray-500 text-md">{place.placeDetails}</p>
          <h2 className="font-medium text-md text-gray-500">
            {place.ticketPricing}
          </h2>
        </div>
        <Button>
          <FaMapLocationDot />
        </Button>
      </div>
    </Link>
  );
}

export default PlaceCard;
