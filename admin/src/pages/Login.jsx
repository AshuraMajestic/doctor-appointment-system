import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

function Login() {
  const [state, setState] = useState("Admin");

  const {setDToken} = useContext(DoctorContext)

  const { setAtoken, backendurl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", { email, password });

        if (data.success) {
          localStorage.setItem("atoken", data.token);
          if (setAtoken) {
            setAtoken(data.token);
          }
        } else {
          toast.error(data.message);
        }
      } else {
        // ✅ Handle Doctor Login
        const { data } = await axios.post(backendurl + "/api/doctor/login", { email, password });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          if (setAtoken) {
            setAtoken(data.token);
          }
        } else {
          toast.error(data.message);
        }

        if (data.success) {
          localStorage.setItem("dt_token", data.token);
          if (setAtoken) {
            setAtoken(data.token);
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-blue-500">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full border border-[#DADADA] rounded p-2 mt-1"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full border border-[#DADADA] rounded p-2"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md text-base">
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span className="text-blue-500 underline cursor-pointer" onClick={() => setState("Doctor")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span className="text-blue-500 underline cursor-pointer" onClick={() => setState("Admin")}>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
