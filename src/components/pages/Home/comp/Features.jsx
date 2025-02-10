function Features() {
  return (
    <div className="my-28">
    <div className="w-full grid place-items-center p-10">
      <h2 className="text-2xl font-bold pb-5">We Offer Best Services</h2>
      <div className="w-full flex flex-col items-center gap-10 mt-10 lg:gap-20 md:flex-row md:justify-evenly">
        <div className="grid place-items-center w-[200px] h-[250px] ">
          <img src="/icons/guideTour.png" className="h-[70px] md:h-[100px]" />
          <h2 className="text-xl font-medium">Guided Tour</h2>
          <p className="text-center">
            Explore AI-crafted itineraries with our personalized guided tour
            feature!
          </p>
        </div>
        <div className="grid place-items-center w-[200px] h-[250px] ">
          <img src="/icons/hotels.png" className="h-[70px] md:h-[100px]" />
          <h2 className="text-xl font-medium">Best Options</h2>
          <p className="text-center">
            Discover the best hotel options tailored to your travel preferences!
          </p>
        </div>
        <div className="grid place-items-center w-[200px] h-[250px] ">
          <img src="/icons/food.png" className="h-[70px] md:h-[100px]" />
          <h2 className="text-xl font-medium">Delicious Cuisine</h2>
            <p className="text-center">
              Indulge in a world of flavors with our handpicked selection of gourmet dishes!
            </p>
        </div>
      </div>
    </div>
    <div></div>
  </div>
  )
}

export default Features