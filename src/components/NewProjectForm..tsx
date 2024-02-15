import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { createProject } from "../actions/project-service";
import { User } from "../types/User";

// interface NewProjectFormProps{
//     create: boolean;
// }

const NewProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     //    dispatch()
  //   }, []);

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createProject({
        title: title,
        description: description,
        creator: user as User,
      })
    );
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
            className="input input-bordered input-sm input-info w-full max-w-xs"
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="label">
            <span className="label-text">Project Description</span>
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
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
