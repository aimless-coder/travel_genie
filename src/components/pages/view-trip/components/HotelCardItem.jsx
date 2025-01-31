/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  console.log(hotel)
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  const placeholderImg = `https://placehold.co/100?text=${hotel?.property?.name}`;

  const addressMatch = hotel?.accessibilityLabel?.match(/(\d+(\.\d+)?)\s*km\s*from\s*centre/);
  const distanceFromCenter = addressMatch ? addressMatch[0] : hotel?.property?.wishlistName;
  ;

  const getPlacePhoto = () => {
    setPhotoUrl(hotel?.property?.photoUrls[1])
    setLoading(false);
  };

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

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
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
      {loading ? (
          <img
            src={placeholderImg}
            className="rounded-lg h-[180px] w-full object-cover"
          />
        ) : (
          <img
            src={photoUrl || placeholderImg}
            className="rounded-lg h-[180px] w-full object-cover"
          />
        )}
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.property?.name}</h2>
          <h2 className="text-xs text-gray-600">{distanceFromCenter}</h2>
          <h2 className="text-xs">{hotel?.property?.priceBreakdown?.grossPrice?.value.toFixed(2)} {hotel?.property?.priceBreakdown?.grossPrice?.currency}</h2>
          <h2 className="text-xs">{hotel?.property?.reviewScore}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
