/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { FaCarSide, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  const placeholderImg = `https://placehold.co/100?text=${hotel?.property?.name}`;

  const addressMatch = hotel?.accessibilityLabel?.match(/(\d+(\.\d+)?)\s*km\s*from\s*centre/);
  const distanceFromCenter = addressMatch ? addressMatch[0] : hotel?.property?.wishlistName;
  ;

  const getPlacePhoto = useCallback(() => {
    setPhotoUrl(hotel?.property?.photoUrls[1])
    setLoading(false);
  }, [hotel]);

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel, getPlacePhoto]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.property?.name +
        "," + 
        hotel?.property?.latitude + 
        "," + 
        hotel?.property?.longitude
      }
      target="_blank"
      className="grid place-items-center"
  
    >
      <div className="cursor-pointer w-[90%] m-2 min-h-[390px] flex flex-col items-center gap-5 p-5 rounded-md shadow-lg hover:scale-105 transition-all justify-center border border-gray-300">
      {loading ? (
          <img
            src={placeholderImg}
            className="rounded-lg h-[150px] w-full object-cover"
          />
        ) : (
          <img
            src={photoUrl || placeholderImg}
            className="rounded-lg h-[150px] w-[150px] md:h-[180px] md:w-[180px] object-cover"
          />
        )}
        <div className="my-2 flex flex-col gap-2 w-full">
          <h2 className="font-medium">{hotel?.property?.name}</h2>
          <div className="flex items-center gap-3">
            <FaCarSide />
            <h2 className="text-xs text-gray-600">{distanceFromCenter}</h2>
          </div>
          <div className="flex items-center gap-3">
            <FaMoneyBillWave />
            <h2 className="text-xs">{hotel?.property?.priceBreakdown?.grossPrice?.value.toFixed(2)} {hotel?.property?.priceBreakdown?.grossPrice?.currency}</h2>
          </div>
          <div className="flex items-center gap-3">
          <FaStar />
            <h2 className="text-xs">{hotel?.property?.reviewScore}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
