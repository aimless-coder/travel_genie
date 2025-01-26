import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/AIModel";
import { FaPlane } from "react-icons/fa";
import { BsDash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      console.log("You need to sign in.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    const tripData = JSON.parse(result?.response?.text());
    console.log("Done");
    navigate("/dashboard/view-trip/generated", {
      state: { userSelection: formData, tripData: tripData },
    });
  };

  return (
    <div className="px-20">
      <h2 className="text-2xl font-bold">Tell Us Your Travel Preference</h2>

      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">What is your Destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">How many days?</h2>
          <Input
            type="number"
            placeholder="Ex: 3 Days"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer  ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Who do you plan to travel with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.noOfPeople == item.people &&
                  "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("noOfPeople", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="w-[200px]"
        >
          {loading ? (
            <>
              <BsDash className="flex items-center justify-center animate-trip" />
              <FaPlane className="h-8 w-8" />
            </>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
