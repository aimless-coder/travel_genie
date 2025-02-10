import { db } from "@/service/FirebaseConfig";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserTripCard from "./components/UserTripCard";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";

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
      toast.success("Deleted successfully");
      GetUserTrip();
    } catch (error) {
      console.error("Error", error);
      toast.error("Error deleting trip");
    }
  }

  const toggleFavorite = async (tripId) => {
    try {
      const tripRef = doc(db, "AITrips", tripId);
      const trip = userTrips.find(t => t.id === tripId);
      await updateDoc(tripRef, {
        isFavorite: !trip.isFavorite
      });
      toast.success(trip.isFavorite ? "Removed from favorites" : "Added to favorites");
      GetUserTrip();
    } catch (error) {
      toast.error("Error updating favorite status");
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
    <div className="px-2 mb-20 mb:px-8">
      <h2 className="font-bold text-3xl mb-5">My Trips</h2>
      <Button
          variant="outline"
          onClick={() => setShowFavorites(!showFavorites)}
          className="flex items-center gap-2 my-5"
        >
          <FaHeart className={showFavorites ? "text-red-500" : ""} />
          {showFavorites ? "Show All" : "Show Favorites"}
        </Button>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
