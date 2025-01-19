import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
        Discover Next Adventure With{" "}
        <span className="text-[#ff0000]">AI Guide</span>
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti magni
        accusamus iure nesciunt est voluptatibus.
      </p>

      <Link to="/create-trip">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Hero;
