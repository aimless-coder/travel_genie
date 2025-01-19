import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/infoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";

function ViewTrip() {
  const { tripID } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripID && getTripData();
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
    <div className="p-10 md:px-20 lg:px-44 xl:px56">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <Itinerary trip={trip} />
    </div>
  );
}

export default ViewTrip;
