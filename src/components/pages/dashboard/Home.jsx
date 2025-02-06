import { useState, useEffect } from "react";
import { ActivityCategories } from "@/constants/categories";
import { db } from "@/service/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    country: "",
  });

  // Fetch user's data from Firebase
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

  // Save user data to Firebase
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

  const toggleCategory = async (category) => {
    setSelectedCategories(prev => {
      let newSelection;
      if (prev.find(cat => cat.id === category.id)) {
        newSelection = prev.filter(cat => cat.id !== category.id);
      } else if (prev.length < 5) {
        newSelection = [...prev, category];
      } else {
        toast.error("You can only select up to 5 categories");
        return prev;
      }
      saveUserData(newSelection);
      return newSelection;
    });
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
    <div className="p-8">
      <div className="grid place-items-center gap-5">
        <div className="h-[120px] w-[120px]">
          <img src={user?.picture} className="h-full w-full rounded-full" alt="Profile" />
        </div>
        <h2 className="font-bold text-center text-3xl">Welcome</h2>
        
        <div className="grid gap-3 w-full max-w-md">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
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
                <label className="block text-sm font-medium mb-1">Gender</label>
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
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <h2 className="font-bold text-xl">
                Name: <span className="font-normal">{profile.name}</span>
              </h2>
              <h2 className="font-bold text-xl">
                Email: <span className="font-normal">{user?.email}</span>
              </h2>
              <h2 className="font-bold text-xl">
                Gender: <span className="font-normal">{profile.gender || "Not set"}</span>
              </h2>
              <h2 className="font-bold text-xl">
                Country: <span className="font-normal">{profile.country || "Not set"}</span>
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Edit Profile
              </button>
            </div>
          )}
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
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Selected: {selectedCategories.length}/5 categories
        </div>
      </div>
    </div>
  );
}

export default Home;
