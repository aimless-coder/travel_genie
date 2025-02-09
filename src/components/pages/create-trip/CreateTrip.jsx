import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/AIModel";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserCategories = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      try {
        const userRef = doc(db, "UserDetails", user.email);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          return docSnap.data().categories || [];
        }
        return [];
      } catch (error) {
        console.error("Error fetching user categories:", error);
        return [];
      }
    }
    return [];
  };

  const handleInputChange = async (changes) => {
    const userCategories = await getUserCategories();
    setFormData({
      ...formData,
      ...changes,
      categories: userCategories
    });
  };

  const onGenerateTrip = async () => {
    if (!formData.location || !formData.noOfDays || !formData.budget || !formData.noOfPeople) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    ).replace(
      "{location}",
      formData?.location?.label
    ).replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    const tripData = JSON.parse(result?.response?.text());
    console.log(tripData)
    navigate("/dashboard/view-trip/generated", {
      state: { userSelection: formData, tripData: tripData },
    });
  };

  return (
    <div className="px-8">
      <h2 className="text-2xl font-bold mb-2">Plan Your Perfect Trip</h2>
      <p className="text-gray-500 text-sm">Ready to explore? Let&apos;s customize your travel experience based on your preferences. Just provide a few details, and we&apos;ll craft an itinerary tailored to your needs!</p>

      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-5">
          <div>
          <h2 className="text-xl font-semibold mb-1">Where Are You Headed?</h2>
          <p className="text-gray-500 text-sm">Enter your destination, and we&apos;ll help you uncover the best attractions and experiences.</p>
          </div>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange({location: value});
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div>
          <h2 className="text-xl font-semibold mb-1">Trip Duration</h2>
          <p className="text-gray-500 text-sm">How many days are you planning to travel? Let us know so we can create a well-paced itinerary for you.</p>
          </div>
          <Input
            type="number"
            placeholder="Ex: 3 Days"
            onChange={(e) => handleInputChange({noOfDays: e.target.value})}
          />
        </div>

        <div>
          <div>
          <h2 className="text-xl font-semibold mb-1">Set Your Budget</h2>
          <p className="text-gray-500 text-sm">Pick a budget that works for you, whether you&apos;re looking for an affordable escape or a luxury getaway</p>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-md cursor-pointer transition-all  ${
                  formData?.budget == item.title && "border-primary shadow-lg bg-primary/10"
                }`}
                onClick={() => handleInputChange({budget: item.title})}
              >
                <div className="flex md:flex-col items-center gap-3">
                <img src={item.image} className="w-[30px] md:w-[40px]" />
                <div>
                <h2 className="font-semibold md:text-center">{item.title}</h2>
                <p className="text-sm text-gray-500 md:text-center">{item.desc}</p>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
          <h2 className="text-xl font-semibold mb-1">
          Who&apos;s Traveling With You?
          </h2>
          <p className="text-gray-500 text-sm">Choose who will be accompanying you on this journey—whether it&apos;s a solo trip, a family vacation, or an adventure with friends.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-md cursor-pointer transition-all ${
                  formData?.noOfPeople == item.people &&
                  "border-primary shadow-lg bg-primary/10"
                }`}
                onClick={() => handleInputChange({
                  noOfPeople: item.people,
                  guest : item.guest
                })}
              >
                <div className="flex md:flex-col items-center gap-3">
                <img src={item.image} className="w-[30px] md:w-[40px]" />
                <div>
                <h2 className="font-semibold md:text-center">{item.title}</h2>
                <p className="text-sm text-gray-500 md:text-center">{item.desc}</p>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-center md:justify-end">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="w-[200px] bg-[#4b164c]"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
