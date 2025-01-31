/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF } from "@/service/GlobalAPI";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const getPlacePhoto = async () => {
    try {
      const tripText = trip?.userSelection?.location?.label;
      const data = {
        textQuery: tripText,
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
    trip && getPlacePhoto();
  }, [trip]);
  return (
    <Link to={"/dashboard/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md p-3">
        <img
          src={photoUrl}
          className="h-[180px] w-[180px] object-cover rounded-lg"
        />
        <div>
          <h2 className="font-medium text-md">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-gray-500 text-sm">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget for{" "}
            {trip?.userSelection?.noOfPeople} people.
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
