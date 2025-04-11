import React, { useContext, useState } from 'react'
import { AdminContext } from '../contact/AdminContext';

function Login() {
  const [state,setState] = useState('Admin')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const{setAtoken,backendUrl} = useContext(AdminContext)

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });

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

  }

  return (
  <form className="min-h-[80vh] flex items-center">
    <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
      <p className="text-2xl font-semibold m-auto"><span className="text-blue-500">{state}</span>Login</p>
      <div>
        <p className="w-full">Email</p>
        <input onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='border border-[#DADADA] rounded w-70 p-2 mt-1 '
            required />
      </div>

      <div>
        <p className="w-full">Password</p>
        <input  onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-70 border border-[#DADADA] rounded p-2 mb-4"/>

<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md text-base">
Login
</button> 
{state === "Admin" ? (
          <p className='mt-2'>
            Doctor Login?{" "}
            <span className="text-blue-500 underline cursor-pointer" onClick={() => setState("Doctor")}>
              Click here
            </span>
          </p>
        ) : (
          <p className='mt-2'>
            Admin Login?{" "}
            <span className="text-blue-500 underline cursor-pointer " onClick={() => setState("Admin")}>
              Click here
            </span>
          </p>
        )}
     </div>
    </div>
  </form>


)
}

export default Login
