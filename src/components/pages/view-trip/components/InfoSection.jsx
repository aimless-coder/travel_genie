/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_REF } from "@/service/GlobalAPI";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { FaShareAlt } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";


function InfoSection({ trip }) {
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const placeholderImg = `https://placehold.co/340?text=${trip?.userSelection?.location?.label || 'Loading...'}`;

  const getPlacePhoto = async () => {
    try {
      const location = trip?.userSelection?.location?.label;
      const data = {
        textQuery: location,
      };

      const result = await GetPlaceDetails(data);

      const photoUrlVar = result.data.places[0].photos.map((item) => {
        const url = PHOTO_REF.replace("{NAME}", item.name);
        return url;
      });

      setPhotoUrl(photoUrlVar);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveTrip = async(trip) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: trip.userSelection,
      tripData: trip.tripData,
      userEmail: user?.email,
      isFavorite: false,
      id: docID
    });
    return docID;
  }

  const shareTrip = async(trip) => {
    try {
      let tripId = trip.id;
      if (!tripId) {
        tripId = await saveTrip(trip);
      }
      const shareableLink = `${window.location.origin}/dashboard/view-trip/${tripId}`;

      if (navigator.share) {
        await navigator.share({
          title: `Travel Plan to ${trip?.userSelection?.location?.label}`,
          text: `Check out this travel plan to ${trip?.userSelection?.location?.label}!`,
          url: shareableLink
        });
      } else {
        await navigator.clipboard.writeText(shareableLink);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing trip:", error);
      alert("Failed to share trip");
    }
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <div>
      {loading ? (
          <img
            src={placeholderImg}
            className="rounded-lg h-[340px] w-full object-cover"
          />
        ) : (
          <Carousel className="relative w-full flex flex-col items-center mb-10">
            <CarouselContent>
              {photoUrl.map((photo, index) => (
                <CarouselItem key={index}><img src= {photo} className="rounded-lg h-[340px] w-full object-cover" /></CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute w-[30%] -bottom-7">
            <CarouselPrevious className="bg-[#4b164c] text-white"/>
            <CarouselNext className="bg-[#4b164c] text-white"/>
            </div>
          </Carousel>
        )}
      <div className="my-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="hidden md:flex gap-5">
          {user && <Button onClick={()=>saveTrip(trip)} className="bg-[#4b164c]">Save Trip</Button>}
          <Button onClick={() => shareTrip(trip)} className="bg-[#4b164c]">Share <FaShareAlt /></Button>
        </div>

        </div>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-[#dd88cf] rounded-full text-white text-xs md:text-md">
            {trip?.userSelection?.noOfDays} Day
          </h2>
          <h2 className="p-1 px-3 bg-[#dd88cf] rounded-full text-white text-xs md:text-md">
            {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-1 px-3 bg-[#dd88cf] rounded-full text-white text-xs md:text-md">
            {trip?.userSelection?.noOfPeople} people
          </h2>
        </div>

        <div className="flex md:hidden gap-5 mt-2 w-full justify-between">
          {user && <Button onClick={()=>saveTrip(trip)} className="bg-[#4b164c] h-8">Save Trip</Button>}
          <Button onClick={() => shareTrip(trip)} className="bg-[#4b164c] h-8">Share <FaShareAlt /></Button>
        </div>

          <h2 className="py-2 text-gray-500">
            {trip?.tripData?.tripDetail?.description}
          </h2>
      </div>
    </div>
  );
}

export default InfoSection;
