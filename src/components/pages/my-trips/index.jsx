import { db } from "@/service/FirebaseConfig";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserTripCard from "./components/UserTripCard";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ ...doc.data(), id: doc.id });
    });
    setUserTrips(trips);
  };

  const deleteTrip = async(tripID) =>{
    try {
      await deleteDoc(doc(db, "AITrips", tripID));
      console.log("Trip deleted")
      GetUserTrip();
    } catch (error) {
      console.log("Error", error);
      
    }
  }

  const toggleFavorite = async (tripId) => {
    try {
      const tripRef = doc(db, "AITrips", tripId);
      const trip = userTrips.find(t => t.id === tripId);
      await updateDoc(tripRef, {
        isFavorite: !trip.isFavorite
      });
      // toast.success(trip.isFavorite ? "Removed from favorites" : "Added to favorites");
      GetUserTrip();
    } catch (error) {
      // toast.error("Error updating favorite status");
      console.error("Error updating favorite:", error);
    }
  };

  const filteredTrips = showFavorites 
    ? userTrips.filter(trip => trip.isFavorite)
    : userTrips;

  useEffect(() => {
    GetUserTrip();
  }, []);
  
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-5">My Trips</h2>
      <Button
          variant="outline"
          onClick={() => setShowFavorites(!showFavorites)}
          className="flex items-center gap-2"
        >
          <FaHeart className={showFavorites ? "text-red-500" : ""} />
          {showFavorites ? "Show All" : "Show Favorites"}
        </Button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <UserTripCard key={index} trip={trip} onDelete={() => deleteTrip(trip.id)} onToggleFavorite={() => toggleFavorite(trip.id)}/>
          ))
        ) : (
          <h2>No Data found</h2>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
