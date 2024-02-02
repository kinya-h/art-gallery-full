import { useState } from "react";
import { artworks } from "../assets/data";
import { ArtworkCard } from "../components/ArtworkCard";
import CategoryFilter from "../components/CategoryFilter";
import { Artwork } from "../types/artwork";
import { ArtworkInfoModal } from "../components/ArtworkInfoModal";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>({
    title: "",
    description: "",
    artist: "",
    price: 0,
    imageSrc: "",
    category: "",
    created_at: 0,
    highest_bid: 0,
  });

  const handleShowMoreInfo = (artwork: Artwork) => {
    setOpen(true);
    setSelectedArtwork(artwork);
    (document?.getElementById("my_modal_1") as HTMLFormElement).showModal();
  };

  return (
    <div className="mt-20">
      {open && <ArtworkInfoModal artwork={selectedArtwork} />}
      <div className="flex justify-end">
        <div className="absolute z-50">
          <CategoryFilter />
        </div>
      </div>
      <section className="container mx-auto mt-16">
        <h2 className="text-3xl font-extrabold mb-8">Featured Artworks</h2>
        <div className="flex gap-3 flex-wrap">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={index}
              artwork={artwork}
              onShowMoreInfo={handleShowMoreInfo}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
