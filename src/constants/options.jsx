export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo in exploration",
    icon: "🙎",
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
    icon: "👩🏻‍❤️‍👨🏻",
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
    icon: "👨‍👩‍👧‍👦",
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
    icon: "👨‍👩‍👧‍👦",
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
    icon: "💸",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced Cost and Comfort",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "High-end Comfort",
    icon: "🏨",
  },
];

export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {noOfDays} Days for {traveler} with {budget} budget, give me Hotels list with hotelName, hotelAddress, price, shareable hotelImageURL, geoCoordinates, rating and suggest itinerary for each day with day number and theme with placeName, placeDetails, placeImageURL, geoCoordinates, ticketPricing, best time to visit on clock each of the location for {noOfDays} days with each day plan in JSON format.`;
