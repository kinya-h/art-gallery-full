import React, { useEffect, useState } from "react";
import { Artwork } from "../types/artwork";
import { useAppDispatch } from "../lib/hooks";
import { bidArtwork } from "../actions/bid-service";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/User";
import Loader from "./Loader";
import { motion as m } from "framer-motion";
import { purhcaseArtwork } from "../actions/purchase-service";
import { getUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

interface artworkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork;
}
const ArtworkDrawer = ({ isOpen, onClose, artwork }: artworkDrawerProps) => {
  const [isBidding, setIsBidding] = useState(false);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
const navigate = useNavigate()

const [isBuying , setIsBuying] = useState(false);
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const { loading } = useSelector((state: RootState) => state.biddingList);
  useEffect(() => {
    dispatch(getUser());
    const handleOutsideClick = (event: any) => {
      if (isOpen && event.target.classList.contains("drawer-toggle")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, open]);

  const handleToggle = () => {
    // to make it not err out
  };

  const handleBidding = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      bidArtwork({
        userId: (user as User).id,
        artworkId: artwork.id,
        amount: +purchaseAmount,
      })
    );
    setAmount("");
  };


const handleBuying = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(
      purhcaseArtwork({buyerUserId: (user as User).id , artworkId:artwork.id , amount: +purchaseAmount })
    );
    setAmount("");

    if (response.type === 'purchase/create/fulfilled') navigate("/purchases")
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // You can adjust the duration as needed
      className="drawer drawer-end  z-50 overflow-hidden"
    >
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={handleToggle}
      />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-4 w-80 min-h-full bg-base-200 pt-40 text-base-content px-5">
          <h2 className="text-3xl text-primary">{artwork?.title}</h2>
          <p className="max-w-[470px]">{artwork?.description}</p>
          <div>
            by <div className="badge badge-outline m-2"> {artwork.artist}</div>
          </div>
          <p className="m-2">{artwork?.collection?.title}</p>

          <div className="stats bg-primary text-primary-content ">
            <div className="stat">
              <h2 className="stat-title font-bold">Price</h2>
              <h2 className="font-bold text-2xl text-black">
                ${artwork.price}
              </h2>

              <div className="stat-actions">


              {isBuying && (
                  <form action="" onSubmit={(e) => handleBuying(e)}>
                    <div className="flex items-center justify-center top-2">
                      {loading && <Loader />}
                    </div>
                    <label className="form-control">
                      <div className="contact info">
                        <span className="label-text">Amount</span>
                      </div>
                      <input
                        type="number"
                        value={purchaseAmount}
                        placeholder="Purchase Amount"
                        className="input text-white input-bordered input-sm input-info w-full max-w-xs"
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                      />
                    </label>

                    <div className="flex ">
                      <div className="form-control ml-auto">
                        <button
                          className="btn btn-sm mt-2  btn-accent"
                          type="submit"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                <button
                  className={`btn btn-sm ${isBuying && "hidden"}`}
                  onClick={() => setIsBuying(true)}
                >
                  Buy
                </button>



              </div>
            </div>

            <div className="stat">
              <h2 className="stat-title font-bold">Highest Bid</h2>
              <h2 className="font-bold text-2xl text-black">
                ${artwork.highest_bid}
              </h2>
              <div className="stat-actions">
                {isBidding && (
                  <form action="" onSubmit={(e) => handleBidding(e)}>
                    <div className="flex items-center justify-center top-2">
                      {loading && <Loader />}
                    </div>
                    <label className="form-control">
                      <div className="contact info">
                        <span className="label-text">Amount</span>
                      </div>
                      <input
                        type="number"
                        value={amount}
                        placeholder="Bid Amount"
                        className="input text-white input-bordered input-sm input-info w-full max-w-xs"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </label>

                    <div className="flex ">
                      <div className="form-control ml-auto">
                        <button
                          className="btn btn-sm mt-2  btn-accent"
                          type="submit"
                        >
                          Bid
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                <button
                  className={`btn btn-sm ${isBidding && "hidden"}`}
                  onClick={() => setIsBidding(true)}
                >
                  Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default ArtworkDrawer;
