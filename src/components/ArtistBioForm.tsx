import { useEffect, useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { createArtistAccount } from "../actions/artist-service";
import { User } from "../types/User";
import Loader from "./Loader";
import { GiCheckMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { getUser } from "../actions/userActions";
import { FaCheck } from "react-icons/fa";

interface ArtistBioFormProps {
  onClose: () => void;
}

const ArtistBioForm = ({ onClose }: ArtistBioFormProps) => {
  const [bio, setBio] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [success, setSuccess] = useState(false);

  const { loading, artist, error } = useSelector(
    (state: RootState) => state.currentAartist
  );
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleCreateArtistAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await dispatch(
      createArtistAccount({ userId: (user as User).id, bio, contactInfo })
    );

    if (response.type === "artist/create/fulfilled") {
      setSuccess(true);
      onClose();
    }
  };

  return (
    <div className="flex">
      <form
        className="card-body max-w-sm ml-auto"
        onSubmit={(e) => handleCreateArtistAccount(e)}
      >
        <div className="flex items-center justify-center">
          {loading && <Loader />}

          {success && (
            <FaCheck
              size={24}
              className="text-green-500 transform scale-1 transition-transform duration-300 "
            />
          )}
          {!!error && !loading && typeof error === "string" && (
            <ImCross
              size={32}
              className="text-red-500 transform scale-1 transition-transform duration-300"
            />
          )}
        </div>

        <label className="form-control">
          <div className="contact info">
            <span className="label-text">Contact Info</span>
          </div>
          <input
            type="text"
            placeholder="Contact Info"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={(e) => setContactInfo(e.target.value)}
          />

          <div className="label">
            <span className="label-text">Your bio</span>
          </div>
          <textarea
            placeholder="Bio"
            className="textarea textarea-bordered textarea-info textarea-sm w-full max-w-xs"
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <div className="flex ">
          <div className="form-control ml-auto">
            <button className="btn btn-sm mt-2  btn-primary" type="submit">
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArtistBioForm;
