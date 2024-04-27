import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth.action";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false)

  //collect data from input
  const HandleInput = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  //login button handle
  const HandleLogIn = (e) => {
    e.preventDefault();
    dispatch(login(loginData)).then((res) => {
      toast.success("Logged in successfully!")
      navigate("/all-workflow");
    }).catch(e => { toast.error(e.response.data.message) });
  };
  return (
    <>
      <div className="bg-cover bg-slate-900 grid place-content-center h-screen">
        <div className=" p-8 bg-slate-900  rounded-md border border-gray-400 shadow-lg   hover:shadow-gray-400 duration-300  shadow-white">
          <h1 className="hero-text">
            Log In
          </h1>
          <form method="POST" onSubmit={(e) => HandleLogIn(e)} className="border-t  pt-2 space-y-6">
            <input
              className="input"
              type="email"
              placeholder="Enter Your username..."
              name="email"
              value={loginData.email}
              onChange={HandleInput}
            />
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password..."
              name="password"
              value={loginData.password}
              onChange={HandleInput}
            />
            <div className="flex space-x-2">
              <input onClick={() => setShowPassword(prev => !prev)} type="checkbox" />
              <h1 className="text-white">Show passwod</h1>
            </div>

            <button
              className="hero-btn max-md:w-full"
              type="submit"
            >
              Log In
            </button>
          </form>
          <section className="flex max-md:flex-col text-gray-300 whitespace-nowrap mt-2 justify-center">
            <p>Not registered Yet?</p>{" "}
            <span
              className="underline text-gray-200 cursor-pointer font-medium"
              onClick={() => navigate("/register")}
            >
              Register Now
            </span>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
