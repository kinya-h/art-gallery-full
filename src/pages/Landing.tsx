import Hero from "../components/Hero";
import Cta from "../components/Cta";
import ConnectCTA from "../components/ConnectCTA";

const Landing = () => {
  // // bulk export from a json file
  // const handleExport = async () => {
  //   console.log("Export Started...");
  //   artworks.forEach(async (artwork) => {
  //     // await dispatch(createArtwork(artwork));
  //   });
  // };

  return (
    <div className="mt-20">
      {/* Filter  */}
      <div>
        <Hero />

        <Cta />
        <ConnectCTA />
      </div>
    </div>
  );
};

export default Landing;
