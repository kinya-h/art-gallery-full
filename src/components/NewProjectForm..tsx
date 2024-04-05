import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { createProject } from "../actions/project-service";
import { Artist } from "../types/Artist";

interface NewProjectFormProps {
  onCreate: () => void;
}

const NewProjectForm = ({ onCreate }: NewProjectFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { artist } = useSelector((state: RootState) => state.currentAartist);
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     //    dispatch()
  //   }, []);

  const handleCreateNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = await dispatch(
      createProject({
        title: title,
        description: description,
        creator: artist as Artist,
      })
    );

    if (payload.type === "project/create/fulfilled") {
      setTitle("");
      setDescription("");
      onCreate();
    }
  };

  return (
    <div className="flex">
      <form
        className="card-body max-w-sm ml-auto"
        onSubmit={(e) => handleCreateNewProject(e)}
      >
        <div className="flex items-center justify-center">
          {/* {loading && <Loader />} */}

          {/* {success && (
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
          )} */}
        </div>

        <label className="form-control">
          <div className="contact info">
            <span className="label-text">Project Title</span>
          </div>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            className="input input-bordered input-sm input-info w-full max-w-xs"
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="label">
            <span className="label-text">Project Description</span>
          </div>
          <textarea
            placeholder="Description"
            value={description}
            className="textarea textarea-bordered textarea-info textarea-sm w-full max-w-xs"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="flex ">
          <div className="form-control ml-auto">
            <button className="btn btn-sm mt-2  btn-primary" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
