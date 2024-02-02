import Hero from "../components/Hero";
import Cta from "../components/Cta";

const Landing = () => {
  return (
    <div className="mt-20">
      {/* Filter  */}
      <div>
        <Hero />

        <Cta />
      </div>
    </div>
  );
};

export default Landing;
