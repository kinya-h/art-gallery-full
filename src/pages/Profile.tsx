import { useSelector } from "react-redux";
import UserBiddings from "../components/UserBiddings";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { fetchArtists, getCurrentArtist } from "../actions/artist-service";
import ArtistsProfile from "../ArtistsProfile";
import ApplyForArtistRoleAlert from "../components/ApplyForArtistRoleAlert";
import ArtistBioForm from "../components/ArtistBioForm";
import SideBar from "../components/SideBar";
import { Project } from "../types/Project";
import ProjectDetails from "../components/ProjectDetails";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const { artists } = useSelector((state: RootState) => state.artists);
  const { artist, success } = useSelector(
    (state: RootState) => state.currentAartist
  );
  const [openAlert, setOpenAlert] = useState(false);
  const [apply, setApply] = useState(false);
  const [showSelectedProject, setShowSelectedProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>({
    title: "",
    description: "",
    creator: { id: 0, username: "", email: "" },
    created_at: "",
    active: false,
  });

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

  const showProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setShowSelectedProject(true);
  };

  // console.log("CURRENT ARTIST => ", artist[0].user);
  return (
    <div className="mt-20 flex relative xs:overflow-scroll">
      <SideBar onProjectSelect={showProjectDetails} />
      <main className="flex-1 w-full">
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
            <ApplyForArtistRoleAlert
              onApply={handleApply}
              onClose={closeAlert}
            />
          )}
        </div>

        {apply && openAlert && <ArtistBioForm onClose={closeAlert} />}

        <ArtistsProfile />
        {showSelectedProject && <ProjectDetails project={selectedProject} />}
        <p>Here are the artworks you have bidded so far:</p>
        <div className="mt-20">
          <UserBiddings />
        </div>
      </main>
    </div>
  );
};

export default Profile;
