import React from "react";
import { hero } from "../assets";

const Hero = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={hero} className="max-w-md rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Immersive Canvases!</h1>
            <p className="py-6">
              Welcome to our vibrant digital canvas, where imagination knows no
              bounds and every stroke tells a story. Explore the vivid tapestry
              of artistic expression woven by talented creators from around the
              globe. From mesmerizing landscapes to thought-provoking portraits,
              immerse yourself in a world where colors dance and emotions speak
              louder than words. Let your senses guide you as you navigate this
              virtual gallery, where each masterpiece invites you to linger,
              ponder, and discover the beauty of human creativity. Unleash your
              inner art connoisseur and embark on a journey through creative
              horizons like never before
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
