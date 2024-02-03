import React, { useEffect, useState } from "react";
import { Artwork } from "../types/artwork";
import { useAppDispatch } from "../lib/hooks";
import { bidArtwork } from "../actions/bid-service";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUser } from "../actions/userActions";
import { AiFillTags } from "react-icons/ai";
import { User } from "../types/User";

interface ArtworkDetailsProps {
  artwork: Artwork;
}
const ArtworkDetails = ({ artwork }: ArtworkDetailsProps) => {
  const { user } = useSelector((state: RootState) => state.authenticatedUser);

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleBidding = async (event: React.FormEvent) => {
    event.preventDefault();
    //Bid Now
    await dispatch(
      bidArtwork({
        userId: (user as User).id,
        artworkId: artwork.id,
        amount: amount,
      })
    );
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
          <div className="flex">
            <div className="badge badge-secondary ml-auto">
              <span>
                <AiFillTags className="text-neutral-content" />
              </span>{" "}
              {artwork.price}
            </div>
          </div>
          <div className="">
            <form action="" onSubmit={(event) => handleBidding(event)}>
              <input
                type="text"
                placeholder="amount"
                className="input input-bordered input-info w-full max-w-xs"
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
