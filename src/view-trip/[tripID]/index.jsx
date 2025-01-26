import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";

function ViewTrip() {
  const { tripID } = useParams();
  const location = useLocation();
  const [trip, setTrip] = useState(location.state || {});

  useEffect(() => {
    if (tripID) {
      getTripData();
    }
  }, [tripID]);

  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such data");
    }
  };

  return (
    <div className="p-10">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <Itinerary trip={trip} />
    </div>
  );
}

export default ViewTrip;
