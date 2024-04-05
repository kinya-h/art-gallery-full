import { Link } from "react-router-dom";
import React, { useState } from "react";
import { getUser, loginUser, signUpUser } from "../actions/userActions";
import { useAppDispatch } from "../lib/hooks";
import { motion as m, AnimatePresence } from "framer-motion";

import Steps from "../components/Steps";
import ArtistBioForm from "../components/ArtistBioForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "../components/Loader";

const ArtistSignUp = () => {
  const dispatch = useAppDispatch();

  const { loading } = useSelector((state: RootState) => state.registeredUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState(0);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const response = await dispatch(
        signUpUser({ username, email, password })
      );
      if (response.type === "auth/registerUser/fulfilled") {
        setStage((prevStage) => prevStage + 1);
        await dispatch(loginUser({ username, password }));
        await dispatch(getUser());
      }
    }
  };

  return (
    <div className="mt-20">
      <div className="hero min-h-screen  bg-base-200">
        <div className="hero-content xs:flex-col flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            {stage === 0 ? (
              <div>
                <p className="text-3xl font-bold">Register for an account.</p>
              </div>
            ) : (
              ""
            )}
            <Steps stage={stage} />
          </div>

          <AnimatePresence mode="wait">
            {stage === 0 && (
              <m.div
                key="stage1"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: "100%" }}
                className="card w-full lg:w-2/3 max-w-md shadow-2xl bg-base-100 mt-4 lg:mt-0"
              >
                <form
                  className="card-body"
                  onSubmit={(event) => handleSignUp(event)}
                >
                  {loading && (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  )}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      className="input input-sm input-bordered"
                      required
                      autoComplete="username"
                      name="ujsanjelkdsjviweo"
                      onChange={(event) => setUsername(event?.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-sm input-bordered"
                      required
                      name="new-email"
                      autoComplete="new-email"
                      onChange={(event) => setEmail(event?.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-sm input-bordered"
                      required
                      autoComplete="new-password"
                      onChange={(event) => setPassword(event?.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      autoComplete="new-password"
                      className="input input-sm input-bordered"
                      required
                      onChange={(event) =>
                        setConfirmPassword(event?.target.value)
                      }
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Register</button>
                  </div>
                  <label className="label">
                    <Link
                      to="/login"
                      className="label-text-alt link link-hover"
                    >
                      Already have an account?, Login
                    </Link>
                  </label>
                </form>
              </m.div>
            )}

            {stage === 1 && (
              <m.div
                key="stage2"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: "100%" }}
                className="flex flex-col items-center justify-center"
              >
                <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
                <ArtistBioForm
                  onClose={() => {}}
                  onSubmit={() => setStage((prevStage) => prevStage + 1)}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ArtistSignUp;
