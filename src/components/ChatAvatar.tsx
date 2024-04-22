import { useAppDispatch } from "../lib/hooks";
import { useEffect } from "react";
import { getUser } from "../actions/userActions";


interface ChatAvatarProps{
    username: string;
}
const ChatAvatar = ({username}:ChatAvatarProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div>
      <div className="avatar online placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-8">
          <span className="text-xl">
            {username?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatAvatar;
