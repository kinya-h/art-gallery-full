import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signUpUser } from "../actions/userActions";
import { useAppDispatch } from "../lib/hooks";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const payload = await dispatch(signUpUser({ username, email, password }));
      if (payload.type === "auth/registerUser/fulfilled") {
        navigate("/login");
      }
    }
  };

  return (
    <div className="mt-20">
      <div className="hero min-h-screen  bg-base-200">
        <div className="hero-content xs:flex-col flex-col lg:flex-row">
          <div className="text-center justify-center lg:text-left">
            <div className="text-center justify-center mb-2">
              <h1 className="text-5xl font-bold">Register Now!</h1>
            </div>
            {/* <p className="py-6  md:max-w-lg">
              Welcome to our online art gallery! Dive into a world of creativity
              with captivating masterpieces from global artists. Whether you're
              an art enthusiast or a first-time visitor, our virtual sanctuary
              invites you to explore a diverse canvas of inspiration. Login now
              to embark on a personalized art experience that celebrates the
              beauty of human expression.
            </p> */}

            <img
              src="https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXhhbXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
              className="rounded-md"
            />
          </div>
          <div className="card w-full lg:w-1/2 max-w-sm shadow-2xl bg-base-100 mt-4 lg:mt-0">
            <form
              className="card-body"
              onSubmit={(event) => handleSignUp(event)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="input input-bordered"
                  required
                  onChange={(event) => setConfirmPassword(event?.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  Already have an account?, Login
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
