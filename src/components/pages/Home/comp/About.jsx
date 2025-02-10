function About() {
  return (
    <div className="w-full grid place-items-center px-5 md:px-20">
      <div className="flex gap-5 justify-center items-center flex-col md:flex-row">
        <img src="/images/mockup.webp" alt="" className=" h-[300px] lg:h-[450px] rounded-lg"/>
        <div className="px-10">
          <h2 className="text-3xl py-10 text-center md:text-start">About <span className="font-bold">Travel Genie</span></h2>
          <ul className="flex flex-col gap-5">
            <li> 🗺️ Plan your perfect trip easily with personalized itineraries based on your chosen destination and budget.</li>
            <li> 🍽️ Discover the best places to visit, dine, and explore during your travels.</li>
            <li> 😊 Enjoy a simple, user-friendly interface that makes travel planning straightforward and fun.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About