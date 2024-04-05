import { useSelector } from "react-redux";
import UserBiddings from "../components/UserBiddings";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { fetchArtists, getCurrentArtist } from "../actions/artist-service";
import ArtistsProfile from "../components/ArtistsProfile";
import ApplyForArtistRoleAlert from "../components/ApplyForArtistRoleAlert";
import ArtistBioForm from "../components/ArtistBioForm";
import SideBar from "../components/SideBar";
import { Project } from "../types/Project";
import ProjectList from "../components/ProjectList";
import { motion as m } from "framer-motion";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const { userBiddings } = useSelector(
    (state: RootState) => state.userBiddings
  );
  const { artist, success } = useSelector(
    (state: RootState) => state.currentAartist
  );
  const { projects } = useSelector((state: RootState) => state.projectList);

  const [openAlert, setOpenAlert] = useState(false);
  const [apply, setApply] = useState(false);
  const [showSelectedProjects, setShowSelectedProjects] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchArtists());
      await dispatch(getCurrentArtist());

      if (typeof artist !== "undefined") {
        if (success && Object.keys(artist).length === 0) {
          setOpenAlert(true);
        }

        // if (typeof (artist) !== 'undefined') {
      }
      //   if (success && artist.length === 0) {
      //     setOpenAlert(true);
      //   }

      // }

      // setOpenAlert(true);
    };

    fetchData();
  }, []);

  const handleApply = () => {
    setApply(true);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const handleSelectedVisibity = (visibility: string) => {
    setShowSelectedProjects(true);
    setSelectedProjects(
      projects.filter((project: Project) => project.visibility === visibility)
    );
  };

  return (
    <div className="mt-20 flex relative xs:overflow-scroll">
      <SideBar onSelectedVisibility={handleSelectedVisibity} />
      <main className="flex-1 w-full">
        <div className="flex ml-12 flex-wrap justify-between items-center">
          <div>
            <h3 className="flex items-center gap-x-2 justify-center text-info font-semibold text-2xl">
              Hello{" "}
              {user && artist?.user?.username ? (
                <span className="badge badge-primary mt-2">
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
        {/* {showSelectedProject && <ProjectDetails project={selectedProject} />} */}
        {showSelectedProjects && (
          <m.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectList projects={selectedProjects} />
          </m.div>
        )}

        {userBiddings.length > 0 ? (
          <div>
            <p>Here are the artworks you have bidded so far:</p>
            <div className="mt-20">
              <UserBiddings />
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Profile;
