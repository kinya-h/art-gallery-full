import { useEffect, useState } from "react";
import { ArtworkCard } from "../components/ArtworkCard";
import { Artwork } from "../types/artwork";
import { ArtworkInfoModal } from "../components/ArtworkInfoModal";
import { useAppDispatch } from "../lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchArtworks } from "../actions/artwork-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArtworkDrawer from "../components/ArtworkDrawer";
import SubNavbar from "../components/SubNavbar";
import { MaterialSymbolsShoppingCart } from "../components/Cart";

const Home = () => {
  const { artworks } = useSelector(
    (state: RootState) => state.featuredArtworks
  );

  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  // const { success, error } = useSelector(
  //   (state: RootState) => state.biddingList
  // );

  const dispatch = useAppDispatch();
  let renderModal = null;

  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [artworkToView, setArtworkToView] = useState<Artwork>({
    id: 0,
    title: "",
    description: "",
    artist: "",
    price: 0,
    imageSrc: "",
    collection: { id: 0, title: "" },
    created_at: 0,
    highest_bid: 0,
  });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>({
    id: 0,
    title: "",
    description: "",
    artist: "",
    price: 0,
    imageSrc: "",
    collection: { id: 0, title: "" },
    created_at: 0,
    highest_bid: 0,
  });

  useEffect(() => {
    const fetchArt = async () => {
      const response = await dispatch(fetchArtworks());
      setFeaturedArtworks(response.payload as Artwork[]);
    };

    fetchArt();

    // if (success) {
    //   toast.success("Bid Successfully Placed");
    // } else if (error) {
    //   toast.error("Bid Failed, try again later!");
    // }
  }, []);

  const handleShowMoreInfo = (artwork: Artwork) => {
    setOpen(true);
    setSelectedArtwork(artwork);
    (document?.getElementById("my_modal_1") as HTMLFormElement)?.showModal();
  };

  const handleOpenDrawer = (artwork: Artwork) => {
    // setIsDrawerOpen(!isDrawerOpen);
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);

    setArtworkToView(artwork);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSelectedCategory = (category: string) => {
    dispatch(fetchArtworks()); // Just incase there was a search filter
    if (category === "All") setFeaturedArtworks(artworks);
    else {
      setFeaturedArtworks(
        artworks.filter((artwork) => artwork?.collection?.title === category)
      );
    }
  };

  const handleSearchArtworks = (artworks: Artwork[]) => {
    setFeaturedArtworks(artworks);
  };
  renderModal = open && <ArtworkInfoModal artwork={selectedArtwork} />;

  return (
    <div className="mt-20">
      {/* cart */}
      <div className="fixed right-0 p-4">
        <MaterialSymbolsShoppingCart className="text-orange-500 h-24 w-auto " />
      </div>

      <ToastContainer />
      {isDrawerOpen && (
        <ArtworkDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          artwork={artworkToView}
        />
      )}
      {renderModal}
      <div className="flex justify-end">
        <div className="z-50 fixed">
          {/* <CategoryFilter /> */}
          <SubNavbar
            onSelectCategory={handleSelectedCategory}
            onSearchArtworks={handleSearchArtworks}
          />
        </div>
      </div>
      <section className="container mx-auto mt-16">
        <h2 className="text-3xl font-extrabold mb-8">Featured Artworks</h2>
        <div className="flex gap-3 flex-wrap">
          {featuredArtworks?.map((artwork, index) => (
            <ArtworkCard
              key={index}
              artwork={artwork}
              onShowMoreInfo={handleShowMoreInfo}
              onOpenDrawer={handleOpenDrawer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
