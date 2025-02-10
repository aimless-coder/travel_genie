import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";
import Weather from "../components/Weather";

function ViewTrip() {
  const { tripID } = useParams();
  const location = useLocation();
  const [trip, setTrip] = useState(location.state || {});

  const getTripData = useCallback(async () => {
    const docRef = doc(db, "AITrips", tripID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      console.log("No such data");
    }
  }, [tripID]);

  useEffect(() => {
    if (tripID) {
      getTripData();
    }
  }, [tripID, getTripData]);

  return (
    <div className="px-2 mb-20 mb:px-8">
      <InfoSection trip={trip} />
      <Weather trip={trip}/>
      <Itinerary trip={trip} />
      <Hotels trip={trip} />
    </div>
  );
}

export default ViewTrip;
