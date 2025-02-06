/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import HotelCardItem from "./HotelCardItem";
import axios from "axios";
import {addDays, format} from "date-fns"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
        setLocationId(response.data?.data?.[0]?.dest_id)

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
      <h2 className="font-bold text-xl mt-1.5 mb-2">Hotel Recommendation</h2>
      <div className="w-full">
        <Carousel className="w-[90%] max-w-full mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3 lg:basis-1/3">
                  <HotelCardItem hotel={hotel} />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-2 md:pl-4">
                <h2>No Hotel found.</h2>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Hotels;
