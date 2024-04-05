import { useAppDispatch } from "../lib/hooks";
import { Project } from "../types/Project";
import { RootState } from "../store";
import React, { useEffect, useState } from "react";
import { getCurrentArtist } from "../actions/artist-service";
import {
  collaborate,
  fetchArtistCollabProjects,
} from "../actions/project-service";
import { Artist } from "../types/Artist";
import { MdVerified } from "react-icons/md";
import { createArtwork, fetchCollections } from "../actions/artwork-service";
import { useSelector } from "react-redux";
import { CalendarIcon, CheckCircleIcon, LockIcon, UsersIcon } from "./Icons";
import { formatTimestamp } from "../services/utils";

interface ProjectDetailsProps {
  project: Project;
}

const SimpleProjectDetails = ({ project }: ProjectDetailsProps) => {
  const { artist } = useSelector((state: RootState) => state.currentAartist);
  const { artistCollabProjects } = useSelector(
    (state: RootState) => state.artistCollabProjectsList
  );
  const { collections } = useSelector(
    (state: RootState) => state.artworkCollections
  );
  const [openSubmitArtworkForm, setOpenSubmitArtworkForm] = useState(false);

  const [artworkTitle, setArtworkTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState(0);

  const [moreDetails, setMoreDetails] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentArtist());
    dispatch(fetchArtistCollabProjects());
    dispatch(fetchCollections());
  }, []);

  const handleCollaborateClick = async (project: Project) => {
    const payload = await dispatch(
      collaborate({ artistId: (artist as Artist).id, projectId: project.id })
    );

    if (payload.type === "collaborator/create/fulfilled") {
      dispatch(fetchArtistCollabProjects()); // refetch to update the ui
    }
  };

  const showProjectSubmission = () => {
    console.log("Hoovered");
  };
  const handleSubmitArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    // title,
    //   imageSrc,
    //   description,
    //   artist,
    //   created_at,
    //   price,
    //   category,

    console.log({
      title: artworkTitle,
      imageSrc: image,
      description: description,
      artist: (artist as Artist).id,
      project: project.id,
      price: price,
      collection: collection,
    });
    const payload = await dispatch(
      createArtwork({
        title: artworkTitle,
        imageSrc: image,
        description: description,
        artist: (artist as Artist).id,
        project: project.id,
        price: price,
        collection: collection,
      })
    );
    if (payload.type === "artwork/create/fulfilled")
      setOpenSubmitArtworkForm(false);
  };

  const isCollaborator = artistCollabProjects.some(
    (collabProject) => collabProject?.project?.id === project?.id
  );

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setMoreDetails(true);
      }}
      className="grid max-w-3xl w-full gap-4 px-4 py-6 mx-auto md:grid-cols-2 md:gap-8 lg:gap-10"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div
            className="text-2xl font-bold hover:cursor-pointer"
            onMouseOver={showProjectSubmission}
          >
            {project.title}
          </div>
          <div className="flex items-center justify-around gap-2 text-sm">
            <div className="rounded-full h-8 w-8 bg-gray-200 dark:bg-gray-800" />
            <span className="badge badge-neutral">
              {project.creator.user.username}
            </span>
            <div className="flex items-center gap-x-2 text-gray-500 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4" />
              <span>Created {formatTimestamp(project.created_at)}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-2 text-base leading-loose md:text-lg md:gap-4">
          <p>{project.description}</p>
        </div>

        {isCollaborator ? (
          <div className="flex items-center justify-between">
            <div
              className="text-green tooltip tooltip-right"
              data-tip="collaborator"
            >
              <button className="hover:cursor-default">
                <MdVerified />{" "}
              </button>
            </div>

            {!openSubmitArtworkForm && moreDetails && (
              <button
                className="btn btn-primary"
                onClick={() => setOpenSubmitArtworkForm(true)}
              >
                Submit Artwork
              </button>
            )}
          </div>
        ) : (
          moreDetails && (
            <button
              onClick={() => handleCollaborateClick(project)}
              className="btn btn-outline btn-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Collaborate
            </button>
          )
        )}
      </div>

      {moreDetails && (
        <div className="flex flex-col items-start gap-4 border rounded-lg p-4 md:items-end md:gap-2 lg:gap-4">
          <div className="grid gap-1 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4" />

              <button>
                <span className="text-gray-500 hover:text-blue-500 dark:text-gray-400">
                  {project.active ? "active" : "completed"}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4" />
              <button>
                <span className="text-gray-500 hover:text-blue-500 dark:text-gray-400">
                  Team Access
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <LockIcon className="w-4 h-4" />
              <button>
                <span className="text-gray-500 hover:text-blue-500 dark:text-gray-400">
                  Private
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit ArtworkForm  */}

      {openSubmitArtworkForm && isCollaborator && (
        <div onClick={() => setMoreDetails(true)}>
          <form
            className="card-body md:-mt-20 "
            onSubmit={(e) => handleSubmitArtwork(e)}
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered input-sm mb-2 w-full max-w-xs"
                onChange={(e) => setArtworkTitle(e?.target.value)}
              />
              <div className="Category">
                <span className="label-text">Category</span>
              </div>
              <select
                onChange={(e) => setCollection(+e.target.value)}
                className="select select-bordered  select-sm w-full max-w-xs"
              >
                <option disabled selected>
                  Select Category
                </option>
                {collections.map((collection) => (
                  <option value={collection.id} key={collection.id}>
                    {collection.title}{" "}
                  </option>
                ))}
              </select>
              <div className="Image">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                placeholder="Image"
                className="input input-bordered input-sm w-full  mb-2 max-w-xs"
                onChange={(e) => setImage(e.target.value)}
              />
              <div className="Price">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered input-sm w-full  mb-2 max-w-xs"
                onChange={(e) => setPrice(+e.target.value)}
              />
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered textarea-info textarea-sm w-full max-w-xs"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="flex ">
              <div className="form-control ml-auto">
                <button className="btn btn-sm mt-2  btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SimpleProjectDetails;
