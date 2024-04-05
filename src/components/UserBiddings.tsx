import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { fetchUserBids } from "../actions/bid-service";

const UserBiddings = () => {
  const { userBiddings } = useSelector(
    (state: RootState) => state.userBiddings
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserBids());
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Artwork</th>
              <th>Artist</th>
              <th>Price</th>
              <th>Bidded Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {userBiddings.map((bidding, i: number) => (
              <tr className="hover" key={i}>
                <th>{i}</th>
                <td>{bidding.artwork.title}</td>
                <td>{bidding.artwork.artist}</td>
                <td>{bidding.artwork.price}</td>
                <td>{bidding.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBiddings;
