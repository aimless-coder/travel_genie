import { useState, useEffect } from "react";
import { ActivityCategories } from "@/constants/categories";
import { db } from "@/service/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

import { FaRegAddressCard } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { Button } from "@/components/ui/button";

function MyProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    country: "",
  });

  const fetchUserData = async () => {
    try {
      const userRef = doc(db, "UserDetails", user?.email);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setSelectedCategories(userData.categories || []);
        setProfile({
          name: userData.name || user?.name || "",
          gender: userData.gender || "",
          country: userData.country || "",
        });
      } else {
        setProfile({
          name: user?.name || "",
          gender: "",
          country: "",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email]);

  const saveUserData = async (newCategories = selectedCategories) => {
    try {
      const userRef = doc(db, "UserDetails", user?.email);
      await setDoc(userRef, {
        categories: newCategories,
        name: profile.name,
        gender: profile.gender,
        country: profile.country,
        updatedAt: new Date().toISOString(),
        userEmail: user?.email
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Failed to save profile");
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.find(cat => cat.id === category.id)) {
        return prev.filter(cat => cat.id !== category.id);
      } else if (prev.length < 5) {
        return [...prev, category];
      } else {
        toast.error("You can only select up to 5 categories");
        return prev;
      }
    });
  };

  const saveCategories = async () => {
    try {
      const userRef = doc(db, "UserDetails", user?.email);
      await setDoc(userRef, {
        categories: selectedCategories,
        name: profile.name,
        gender: profile.gender,
        country: profile.country,
        updatedAt: new Date().toISOString(),
        userEmail: user?.email
      }, { merge: true });
      toast.success("Categories saved successfully");
    } catch (error) {
      console.error("Error saving categories:", error);
      toast.error("Failed to save categories");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUserData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-8">
      <div className="flex gap-5 items-center justify-between">
        <div className="w-full flex-1 grid place-items-center md:place-items-start gap-5">
            <div className="h-[120px] w-[120px] rounded-full border-2 border-[#4b164c]">
            <img src={user?.picture} className="h-full w-full rounded-full" alt="Profile" />
            </div>
            <div className="grid gap-3 w-full max-w-md">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex gap-2 w-full justify-evenly">
                <Button
                  type="submit"
                  className="px-4 py-2 w-28 bg-[#4b164c] text-white rounded-md hover:bg-[#4b164c]/90"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 w-28 border rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="font-bold text-xl flex items-center gap-5">
               <CgProfile /> <span className="font-normal">{profile.name}</span>
              </h2>
              <h2 className="font-bold text-xl flex items-center gap-5">
              <IoMailOpenOutline /> <span className="font-normal">{user?.email}</span>
              </h2>
              <h2 className="font-bold text-xl flex items-center gap-5"><FaRegAddressCard />
               <span className="font-normal">{(profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)) || "Not set"}</span>
              </h2>
              <h2 className="font-bold text-xl flex items-center gap-5">
              <BsGlobeCentralSouthAsia /><span className="font-normal">{profile.country || "Not set"}</span>
              </h2>
              <Button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#4b164c] text-white rounded-md hover:bg-[#4b164c]/90"
              >
                Edit Profile
              </Button>
            </div>
          )}
            </div>
        </div>
        <div className="hidden md:grid place-items-center">
            <img src="/images/travel_world.webp" alt="travel the world" className="max-h-[370px]" />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Select Your Travel Interests</h2>
        <p className="text-gray-500 mb-6">Choose up to 5 categories that interest you the most</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ActivityCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => toggleCategory(category)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedCategories.find(cat => cat.id === category.id)
                  ? "border-primary shadow-lg bg-primary/10"
                  : "hover:shadow-md"
              }`}
            >
              <div className="flex md:flex-col items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="grid place-items-start md:place-items-center">
                  <h3 className="font-semibold md:text-center">{category.title}</h3>
                  <p className="text-sm text-gray-500 md:text-center">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pb-10">

        <div className="mt-4 text-sm text-gray-500">
          Selected: {selectedCategories.length}/5 categories
        </div>
        <Button
          onClick={saveCategories}
          className="mt-4 px-4 py-2 bg-[#4b164c] text-white rounded-md hover:bg-[#4b164c]/90"
        >
          Save Categories
        </Button>
        </div>

      </div>
    </div>
  );
}

export default MyProfile