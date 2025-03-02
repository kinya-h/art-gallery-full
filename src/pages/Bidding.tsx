import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { useParams } from "react-router-dom";
import { Artwork } from "../types/artwork";
import { getArtwork } from "../actions/artwork-service";
import { MaterialSymbolsShoppingCart } from "../components/Cart";
import { Bid } from "../types/Bid";
import { fetchUserBids } from "../actions/bid-service";
import PayementGateway from "../components/PayMentGateway";

const Bidding = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const { userBiddings, bidId } = useSelector(
    (state: RootState) => state.userBiddings
  );
  const [biddedArtwork, setBiddedArtwork] = useState<Bid | undefined>(
    {} as Bid
  );

  // const { loading } = useSelector((state: RootState) => state.biddingList);
  // const [amount, setAmount] = useState("");
  // const [purchaseAmount, setPurchaseAmount] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  useEffect(() => {
    const getUserBiddings = async () => {
      const response = await dispatch(fetchUserBids());
      console.log(response);
    };
    getUserBiddings();

    if (id) {
      // if (userBiddings.length === 0) {
      //   dispatch(fetchUserBids());
      // }
      const selectedBiddedArtwork = userBiddings.find(
        (bid) => bid.id === bidId
      );
      setBiddedArtwork(selectedBiddedArtwork);
    }
  }, [id, userBiddings]);
  console.log(bidId);

  const handleBuying = () => {
    setIsBuying(true);
  };
  const handleCancelPayment = () => {
    setIsBuying(false);
  };

  return (
    <div className="mt-14">
      {/* <div className="fixed right-0 p-4">
        <MaterialSymbolsShoppingCart className="text-orange-500 h-24 w-auto " />
      </div> */}

      <div className="flex justify-center items-center mt-10">
        <div className="w-1/2">
          <div className="card shadow-lg">
            <figure>
              <img
                src={biddedArtwork?.artwork?.imageSrc}
                alt={biddedArtwork?.artwork?.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{biddedArtwork?.artwork?.title}</h2>
              <p className="text-xs">{biddedArtwork?.artwork?.description}</p>
              <div className="flex">
                <div className="divider w-full ml-auto mt-3"></div>
              </div>
              <div className="flex items-center">
                <div className="badge badge-soft badge-secondary">
                  $ {biddedArtwork?.amount}
                </div>
                {!isBuying && (
                  <button
                    onClick={() => handleBuying()}
                    className="ml-auto btn btn-sm mt-2  btn-accent"
                    type="submit"
                  >
                    Buy
                  </button>
                )}

                {isBuying && (
                  <PayementGateway
                    onCancelPayment={handleCancelPayment}
                    amount={biddedArtwork?.amount as number}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bidding;
