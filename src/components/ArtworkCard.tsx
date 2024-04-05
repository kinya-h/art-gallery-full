import { Artwork } from "../types/artwork";
import { AiFillTags } from "react-icons/ai";

interface ArtworkProps {
  artwork: Artwork;
  onShowMoreInfo?: (artwork: Artwork) => void;
  onOpenDrawer: (artwork: Artwork) => void;
}

export const ArtworkCard = ({ artwork, onOpenDrawer }: ArtworkProps) => {
  const openDrawer = () => {
    onOpenDrawer(artwork);
  };

  return (
    <div className="card w-96 h-fit bg-base-100 shadow-xl" onClick={openDrawer}>
      <label htmlFor="my-drawer-4"></label>
      <figure>
        <img src={artwork.imageSrc} alt={artwork.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {artwork.title}
          <div className="badge badge-secondary">
            <span>
              <AiFillTags className="text-neutral-content" />
            </span>{" "}
            {artwork.price}
          </div>
        </h2>
        <p className="text-xs">{artwork.description.substring(0, 200)} ...</p>

        <div className="flex">
          <div className="divider w-2/3 ml-auto mt-3"></div>
        </div>

        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            {artwork?.collection?.title}
          </div>
          <div className="badge badge-outline">{artwork.artist}</div>

          {/* <div className="badge badge-primary">
            <button onClick={(event) => showMoreInfo(event, artwork)}>
              view
            </button>
          </div> */}
        </div>

        <div className="flex">
          <div className="divider w-2/3 mr-auto mt-3"></div>
        </div>
      </div>
    </div>
  );
};
