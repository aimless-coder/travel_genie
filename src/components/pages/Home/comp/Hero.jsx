import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <div className="flex flex-col px-5 gap-1 md:gap-5 md:px-20 justify-center items-center md:flex-row">
        <div className="p-5 md:p-10 grid place-items-center md:place-items-start">
        <h1 className="font-light text-3xl md:text-5xl text-center md:text-left">
            Unlock <br />
            <span className="font-extrabold text-3xl md:text-5xl">
            Intelligent Tavel Guide
            </span>
          </h1>
          <p className="text-xl my-5 font-medium md:text-2xl text-center md:text-left">
            Discover seamless adventures tailored just for you with the power of
            AI.
          </p>

          <Link to="/dashboard/my-profile">
            <Button className="w-[200px] my-5 md:my-10"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="p-4 h-full grid place-items-center">
            <div className="relative ">
                <img src="/images/hero.jpg" alt="hero" className="w-[300px] md:w-[500px]" />
            <div className="absolute inset-0">
                <img src="/images/australia.webp" className="w-[85px] md:w-[100px] rounded-full absolute top-0 -left-5 md:-left-10"/>
                <img src="/images/mountain.webp" className="w-[65px] md:w-[70px] rounded-full absolute top-0 -right-5"/>
                <img src="/images/london.webp" className="w-[100px] md:w-[120px] rounded-full absolute -bottom-16 left-3"/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Hero