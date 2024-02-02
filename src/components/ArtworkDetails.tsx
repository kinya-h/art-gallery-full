import React, { useState } from "react";
import { Artwork } from "../types/artwork";

interface ArtworkDetailsProps {
  artwork: Artwork;
}
const ArtworkDetails = ({ artwork }: ArtworkDetailsProps) => {
  const [amount, setAmount] = useState(0);

  const handleBidding = (event: React.FormEvent) => {
    event.preventDefault();
    //Bid Now
    console.log("BID AMOUNT = ", amount);
  };
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <div>
          <img
            src={artwork.imageSrc}
            alt={artwork.title}
            className="h-96 w-96 object-contain"
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{artwork.title}</h2>
          <p className="text-sm">{artwork.description}</p>

          <div className="">
            <form action="" onSubmit={(event) => handleBidding(event)}>
              <input
                type="text"
                placeholder="amount"
                className="input input-bordered input-warning w-full max-w-xs"
                onChange={(event) => setAmount(+event?.target.value)}
              />
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-outline btn-accent" type="submit">
                  Bid Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
