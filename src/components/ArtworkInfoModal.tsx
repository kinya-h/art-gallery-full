import { Artwork } from "../types/artwork";
// import { ArtworkCard } from "./ArtworkCard";
import ArtworkDetails from "./ArtworkDetails";

interface artworkInfoModalProps {
  artwork: Artwork;
}

export const ArtworkInfoModal = ({ artwork }: artworkInfoModalProps) => {
  console.log("SELECTED ARTWORK", artwork);
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => openModal()}>
        open modal
      </button> */}
      <h2>{artwork.artist}</h2>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* <ArtworkCard artwork={artwork} /> */}
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              {/* <button className="btn">Close</button> */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <ArtworkDetails artwork={artwork} />
          </div>
        </div>
      </dialog>
    </div>
  );
};
