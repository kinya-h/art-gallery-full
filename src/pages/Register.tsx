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
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6  md:max-w-lg">
              Welcome to the registration page for our online art gallery! Join
              our creative community by signing up today. As a registered
              member, you'll gain access to a curated collection of captivating
              artworks from talented artists worldwide. Unleash your passion for
              art and become part of a vibrant space that celebrates creativity.
              Register now to start your journey into the world of aesthetic
              wonders.
            </p>
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
