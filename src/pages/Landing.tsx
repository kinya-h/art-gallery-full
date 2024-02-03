import Hero from "../components/Hero";
import Cta from "../components/Cta";
import { artworks } from "../assets/data";
import { useAppDispatch } from "../lib/hooks";
import { addArtwork } from "../actions/artwork-service";

const Landing = () => {
  const dispatch = useAppDispatch();

  const handleExport = async () => {
    console.log("Export Started...");
    artworks.forEach(async (artwork) => {
      await dispatch(addArtwork(artwork));
    });
  };
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
