import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { useEffect } from "react";
import { getUser } from "../actions/userActions";

const Avatar = () => {
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div>
      <div className="avatar online placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-8">
          <span className="text-xl">
            {user?.username?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
