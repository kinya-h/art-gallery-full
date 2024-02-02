import { Link } from "react-router-dom";

const Cta = () => (
  <div className="flex justify-center mt-10">
    <div className=" p-8 rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-extrabold text-white mb-4">
        Discover Your Canvas
      </h2>
      <p className="text-lg text-white mb-6">
        Immerse yourself in a world of digital art. Explore unique pieces that
        speak to your soul and redefine the way you experience creativity.
      </p>
      <Link to="/home">
        <button className="btn btn-secondary hover:text-white py-2 px-6 rounded-full font-semibold transition-all duration-300">
          Explore Now
        </button>
      </Link>
    </div>
  </div>
);

export default Cta;
