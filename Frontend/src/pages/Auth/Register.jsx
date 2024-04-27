import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth.action";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ username: "", email: '', password: "" });
  const [showPassword, setShowPassword] = useState(false)
  const { username, email, password } = data
  const HandleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(data))
      .then(() => { toast.success('Registered successfully!'); navigate("/") })
      .catch(e => { toast.error(e.response.data.message) })
  };

  return (
    <>
      <div className="bg-cover bg-slate-900 grid place-content-center- w-full h-screen ">
        <div className="block  m-auto p-8  bg-slate-900 rounded-md border border-gray-400 shadow-lg shadow-white hover:shadow-gray-400 duration-300">
          <h1 className="hero-text">
            Registration{" "}
          </h1>
          <form onSubmit={HandleSubmit} className="border-t pt-2 space-y-6 max-md:space-y-3">
            <input
              className="input"
              type="text"
              placeholder="user name*"
              value={username}
              name="username"
              onChange={HandleInput}
            ></input>
            <input
              className="input"
              type="email"
              placeholder="Enter Your email..."
              name="email"
              value={email}
              onChange={HandleInput}
            />
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              value={password}
              name="password"
              onChange={HandleInput}
            ></input>
               <div className="flex space-x-2">
              <input onClick={() => setShowPassword(prev => !prev)} type="checkbox" />
              <h1 className="text-white">Show passwod</h1>
            </div>
            <button
              className="hero-btn max-md:w-full"
              type="submit"
            >
              Register
            </button>
          </form>
          <section className="flex text-gray-300 max-md:flex-col whitespace-nowrap mt-2 justify-center">
            <p>Already registered ?</p>{" "}
            <span
              className="underline text-gray-200 cursor-pointer font-medium"
              onClick={() => navigate("/")}
            >
              Login Now
            </span>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
