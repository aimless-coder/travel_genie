import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-[url('/images/bg-hero.webp')] h-[100vh] w-full bg-fill bg-cover overflow-x-hidden grid items-center absolute top-0 left-0 z-0">
      <div className="m-5  md:m-20">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-center font-light text-5xl md:text-7xl text-white">
            Unlock <br />
            <span className="font-extrabold text-5xl md:text-7xl">
              Inelegant Tavel Guide
            </span>
          </h1>
          <p className="text-2xl my-5 font-medium text-center text-white">
            Discover seamless adventures tailored just for you with the power of
            AI.
          </p>

          <Link to="/dashboard/home">
            <Button
              style={{
                width: "200px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
