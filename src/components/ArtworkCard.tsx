import { Artwork } from "../types/artwork";
import { AiFillTags } from "react-icons/ai";

interface ArtworkProps {
  artwork: Artwork;
  onShowMoreInfo: (artwork: Artwork) => void;
}

export const ArtworkCard = ({ artwork, onShowMoreInfo }: ArtworkProps) => {
  const showMoreInfo = (event: React.MouseEvent, artwork: Artwork) => {
    event.preventDefault();
    onShowMoreInfo(artwork);
  };

  return (
    <div className="card w-96 h-fit bg-base-100 shadow-xl">
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
        <p>{artwork.description.substring(0, 200)} ...</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{artwork.category}</div>
          <div className="badge badge-outline">{artwork.artist}</div>
          <div className="badge badge-primary">
            <button onClick={(event) => showMoreInfo(event, artwork)}>
              view
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
