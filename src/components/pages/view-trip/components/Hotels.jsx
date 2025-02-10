/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import HotelCardItem from "./HotelCardItem";
import axios from "axios";
import {addDays, format} from "date-fns"

function Hotels({ trip }) {
  const [hotels, setHotels] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [locationType, setLocationType] = useState(null);

  const location = trip?.userSelection?.location?.label;

  useEffect(() => {
    const fetchLocationId = async () => {
      try {
        const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination', {
          params: {
            query: location,
            locale: 'en-us',
          },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPITAPI_BOOKINGDOTCOM,
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
          }
        });
        setLocationId(response.data?.data?.[0]?.dest_id)
        setLocationType(response?.data?.data?.[0]?.dest_type)

      } catch (error) {
        console.error('Error fetching location ID:', error);
      }
    };

    fetchLocationId();
  }, [trip]);

  useEffect(() => {
    if (locationId) {
      const currentDate = new Date();
      const days = +(trip?.userSelection?.noOfDays)
      const startDate = format(currentDate, 'yyyy-MM-dd');
      const endDate = format(addDays(currentDate, days), 'yyyy-MM-dd');

      const fetchHotels = async () => {
        try {
          const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels', {
            params: {
              dest_id: locationId,
              search_type: locationType,
              arrival_date: startDate,
              departure_date: endDate,
              adults: trip?.userSelection?.guest?.adult,
              locale: 'en-us',
              currency_code: 'INR'
            },
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPITAPI_BOOKINGDOTCOM,
              'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
          });
          setHotels(response.data.data.hotels);
          
        } catch (error) {
          console.error('Error fetching hotels:', error);
        }
      };

      fetchHotels();
    }
  }, [locationId]);

  return (
    <div className="py-4 flex flex-col w-full">
  <h2 className="font-bold text-xl mt-1.5 mb-2">Recommended Hotels</h2>
  <div className="w-full overflow-x-auto custom-scrollbar py-5">
    <div className="flex gap-6 px-4 snap-x snap-mandatory">
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] snap-start">
            <HotelCardItem hotel={hotel} />
          </div>
        ))
      ) : (
        <div className="px-2">
          <h2 className="text-start">No Hotel found.</h2>
        </div>
      )}
    </div>
  </div>
  <div className="h-[100px]"></div>
</div>

  );
}

export default Hotels;
