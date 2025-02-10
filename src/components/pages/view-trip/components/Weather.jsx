/* eslint-disable react/prop-types */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiFog,
  WiSnowflakeCold
} from "react-icons/wi";

function Weather({trip}) {
    const [weatherData, setWeatherData] = useState(null)
    const [currentTime, setCurrentTime] = useState("")
    const [iconSize, setIconSize] = useState(48)

    useEffect(() => {
        const updateIconSize = () => {
            const newSize = window.innerWidth < 640 ? 32 : 48
            setIconSize(newSize)
        }

        updateIconSize()
        window.addEventListener("resize", updateIconSize)
        
        return () => window.removeEventListener("resize", updateIconSize)
    }, [])

    const generateIcon = (weatherData) =>{
        const iconId = parseInt(weatherData.weather[0].icon.replace(/[dn]/, ''));
    
        switch(iconId){
            case 1:
                return <WiDaySunny size={iconSize} />;
    
            case 2:
                return <WiDayCloudy size={iconSize} />;
            
            case 3:
                return <WiCloud size={iconSize} />;
                
            case 4:
                return <WiCloudy size={iconSize} />;
            
            case 9:
                return <WiShowers size={iconSize} />;
    
            case 10:
                return <WiRain size={iconSize} />;
            
            case 11:
                return <WiThunderstorm size={iconSize} />;
            
            case 13:
                return <WiSnowflakeCold size={iconSize} />;
    
            case 50:
                return <WiFog size={iconSize} />;
    
            default:
                return <WiDayCloudy size={iconSize} />;
        }
    }

    const fetchWeather = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: trip?.userSelection?.location?.label,
                    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
                    units: 'metric'
                }
            });
            setWeatherData(response.data);

        } catch (error) {
            console.error("Error:", error)
        }
    }, [trip]);

    const getCurrentTime = useCallback(() => {
        if (!weatherData) return "";
        const localTimestamp = Date.now() + weatherData.timezone * 1000;
        const targetDate = new Date(localTimestamp);
        let hours = targetDate.getUTCHours();
        const minutes = targetDate.getUTCMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    }, [weatherData]);

    useEffect(() => {
        if (trip) {
            fetchWeather();
        }
    }, [trip, fetchWeather])

    useEffect(() => {
        if (weatherData) {
            setCurrentTime(getCurrentTime());
            const intervalId = setInterval(() => {
                setCurrentTime(getCurrentTime());
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [weatherData, getCurrentTime])

    if (!weatherData || !weatherData.main) return <div>Loading...</div>;

    return (
        <div className="flex justify-between items-center w-full py-5 md:p-5">
            <div className="grid place-items-center">
                <p className="font-bold text-gray-500 text-sm md:text-base">MIN</p>
                <p className="font-bold text-sm md:text-base">{weatherData.main.temp_min} °C</p>
            </div>
            <div className="flex justify-center items-center gap-1 md:gap-3">
                <span className="hidden md:grid">{generateIcon(weatherData)}</span>
                <div>
                    <div className="flex justify-evenly items-center gap-1 md:justify-start">
                    <span className="grid md:hidden">{generateIcon(weatherData)}</span>
                    <h2 className="text-xl md:text-2xl">{Math.round(weatherData.main.temp)} °C</h2>

                    </div>
                    <p className="text-sm text-gray-500 text-center md:text-start">Feels like <span className="font-bold">{weatherData.main.feels_like}</span> °C</p>
                    <p className="text-sm text-gray-500 text-center md:text-start">Current Time: <span className="font-bold">{currentTime}</span></p>
                </div>
            </div>
            <div className="grid place-items-center">
                <p className="font-bold text-gray-500 text-sm md:text-base">MAX</p>
                <p className="font-bold text-sm md:text-base">{weatherData.main.temp_max} °C</p>
            </div>
        </div>
    )
}

export default Weather