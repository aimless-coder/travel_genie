export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo in exploration",
    image: "/icons/solo.png",
    people: "1",
    guest:{
      adult: 1,
      children: 0,
    }
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveler in tandem",
    image: "/icons/couple.png",
    people: "2",
    guest:{
      adult: 2,
      children: 0,
    }
  },
  {
    id: 3,
    title: "Family",
    desc: "A family of adventure",
    image: "/icons/family.png",
    people: "4",
    guest:{
      adult: 2,
      children: 1,
    }
  },
  {
    id: 4,
    title: "Group",
    desc: "A solo in exploration",
    image: "/icons/friend.png",
    people: "4+",
    guest:{
      adult: 4,
      children: 0,
    }
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of Cost",
    image: "/icons/cheap.png",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced Cost and Comfort",
    image: "/icons/moderate.png",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "High-end Comfort",
    image: "/icons/luxury.png",
  },
];

export const AI_PROMPT = `Generate a structured travel itinerary in JSON format for Location: {location}, for {noOfDays} Days for {traveler} with a {budget} budget. Start by providing a brief description of {location} that highlights its cultural, historical, and tourist significance within 50-70 words. Then, create an itinerary where each day's plan is optimized so that all the places visited are in close proximity to one another, minimizing travel time. The JSON output should include the keys: "location", "description", "duration", "numberOfPeople", "budget", and "itinerary". The "itinerary" should be an array in which each element represents a day’s plan in sequence containing a "dayNumber", a "theme" for that day, and a "places" array. Each object within the "places" array must include "placeName", "placeDetails", "ticketPricing", "bestTimeToVisit" (time range in HH:MM am/pm format), and "travelMode" (e.g., Walk, Taxi, Public Transport).Importantly, ensure that each day's itinerary includes exactly three main activities and one food break (either lunch or dinner) at a recommended restaurant that aligns with the specified budget.  Whenever possible, suggest recommended restaurants and special places that offer unique or exceptional experiences, including details on why these recommendations are noteworthy. Ensure the itinerary provides a balanced mix of sightseeing, leisure, and food breaks while staying within the specified budget, and includes a diverse range of historical, cultural, natural, and entertainment attractions relevant to {location}.`;
