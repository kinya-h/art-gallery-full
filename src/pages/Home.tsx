import { useEffect, useState } from "react";
import { ArtworkCard } from "../components/ArtworkCard";
import CategoryFilter from "../components/CategoryFilter";
import { Artwork } from "../types/artwork";
import { ArtworkInfoModal } from "../components/ArtworkInfoModal";
import { useAppDispatch } from "../lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchArtworks } from "../actions/artwork-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { artworks } = useSelector(
    (state: RootState) => state.featuredArtworks
  );

  const { success, error } = useSelector(
    (state: RootState) => state.biddingList
  );

  const dispatch = useAppDispatch();
  let renderModal = null;

  const [open, setOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>({
    id: 0,
    title: "",
    description: "",
    artist: "",
    price: 0,
    imageSrc: "",
    category: "",
    created_at: 0,
    highest_bid: 0,
  });

  //TODO: use react-query in future
  useEffect(() => {
    dispatch(fetchArtworks());
    if (success) {
      toast.success("Bid Successfully Placed");
    } else if (error) {
      toast.error("Bid Failed, try again later!");
    }
  }, [success]);

  const handleShowMoreInfo = (artwork: Artwork) => {
    setOpen(true);
    setSelectedArtwork(artwork);
    (document?.getElementById("my_modal_1") as HTMLFormElement)?.showModal();
  };
  renderModal = open && <ArtworkInfoModal artwork={selectedArtwork} />;

  return (
    <div className="mt-20">
      <ToastContainer />
      {renderModal}
      <div className="flex justify-end">
        <div className="absolute z-50">
          <CategoryFilter />
        </div>
      </div>
      <section className="container mx-auto mt-16">
        <h2 className="text-3xl font-extrabold mb-8">Featured Artworks</h2>
        <div className="flex gap-3 flex-wrap">
          {artworks?.map((artwork, index) => (
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
