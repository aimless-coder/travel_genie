/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import HotelCardItem from "./HotelCardItem";
import axios from "axios";
import {addDays, format} from "date-fns"

function Hotels({ trip }) {
  const [hotels, setHotels] = useState([]);
  const [locationId, setLocationId] = useState(null);

  useEffect(() => {
    const fetchLocationId = async () => {
      try {
        const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination', {
          params: {
            query: trip?.userSelection?.location?.label,
            locale: 'en-us',
          },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPITAPI_BOOKINGDOTCOM,
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
          }
        });
        console.log(response.data.data[0])
        setLocationId(response.data?.data?.[0]?.dest_id)

      } catch (error) {
        console.error('Error fetching location ID:', error);
      }
    };

    fetchLocationId();
  }, [trip]);

  useEffect(() => {
    if (locationId) {
      console.log("Loc Id", locationId)
      const currentDate = new Date();
      const days = +(trip?.userSelection?.noOfDays)
      const startDate = format(currentDate, 'yyyy-MM-dd');
      const endDate = format(addDays(currentDate, days), 'yyyy-MM-dd');

      const fetchHotels = async () => {
        try {
          const response = await axios.get('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels', {
            params: {
              dest_id: locationId,
              search_type: 'CITY',
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

          console.log("Hotel List", response.data.data)
          setHotels(response.data.data.hotels);
          
        } catch (error) {
          console.error('Error fetching hotels:', error);
        }
      };

      fetchHotels();
    }
  }, [locationId]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-1.5 mb-2">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-5 py-5">
        {hotels.length > 0 ? (hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))): (<h2>No Hotel found.</h2>)}
        
      </div>
    </div>
  );
}

export default Hotels;
