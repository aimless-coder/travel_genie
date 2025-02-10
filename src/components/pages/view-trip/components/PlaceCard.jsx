/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF } from "@/service/GlobalAPI";
import { useEffect, useState, useCallback } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  const placeholderImg = `https://placehold.co/100?text=${place.placeName}`;

  const getPlacePhoto = useCallback(async () => {
    try {
      const placeText = place.placeName;
      const data = { textQuery: placeText };
      const result = await GetPlaceDetails(data);
      const photoUrlVar = PHOTO_REF.replace(
        "{NAME}",
        result.data.places[0].photos[4].name
      );
      setPhotoUrl(photoUrlVar);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
    }
  }, [place]);

  useEffect(() => {
    place && getPlacePhoto();
  }, [place, getPlacePhoto]);

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="shadow-md rounded-xl p-2 md:p-5 mt-2 flex flex-col md:flex-row gap-5 items-center justify-between hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
      {loading ? (
          <img
            src={placeholderImg}
            className="rounded-lg h-[100px] w-[100px] object-cover"
          />
        ) : (
          <img
            src={photoUrl || placeholderImg}
            className="rounded-lg h-[100px] w-[100px] object-cover"
          />
        )}
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="font-bold text-base md:text-lg">{place.placeName}</h2>
          <p className="text-gray-500 text-sm md:text-md">{place.placeDetails}</p>
          <h2 className="font-medium text-sm md:text-md text-gray-500">
            {place.ticketPricing}
          </h2>
        </div>
        <Button className="hidden md:grid bg-[#4b164c]">
          <FaMapLocationDot />
        </Button>
      </div>
    </Link>
  );
}

export default PlaceCard;
