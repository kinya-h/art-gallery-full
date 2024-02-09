import { useSelector } from "react-redux";
import UserBiddings from "../components/UserBiddings";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { fetchArtists, getCurrentArtist } from "../actions/artist-service";
import ArtistsProfile from "../ArtistsProfile";
import ApplyForArtistRoleAlert from "../components/ApplyForArtistRoleAlert";
import ArtistBioForm from "../components/ArtistBioForm";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const { artists } = useSelector((state: RootState) => state.artists);
  const { artist, success } = useSelector(
    (state: RootState) => state.currentAartist
  );
  const [openAlert, setOpenAlert] = useState(false);
  const [apply, setApply] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchArtists());
      await dispatch(getCurrentArtist());

      if (success && Object.keys(artist).length === 0) {
        setOpenAlert(true);
      }
    };

    fetchData();
  }, []);

  const handleApply = () => {
    setApply(true);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  // console.log("CURRENT ARTIST => ", artist[0].user);
  return (
    <div className="mt-20">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-info font-semibold text-2xl">
            Hello{" "}
            {user && artist?.user?.username ? (
              <span className="badge badge-primary">
                {artist?.user?.username}
              </span>
            ) : (
              artist?.user?.username
            )}
          </h3>
        </div>
        {openAlert && (
          <ApplyForArtistRoleAlert onApply={handleApply} onClose={closeAlert} />
        )}
      </div>

      {apply && openAlert && <ArtistBioForm onClose={closeAlert} />}
      <p>Here are the artworks you have bidded so far:</p>
      <div className="mt-20">
        <UserBiddings />

        <ArtistsProfile artist={artists[0]} />
      </div>
    </div>
  );
};

export default Profile;
