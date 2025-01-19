import { db } from "@/service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }

    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    GetUserTrip();
  }, []);
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-5">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCard key={index} trip={trip} />
          ))
        ) : (
          <h2>No Data found</h2>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
