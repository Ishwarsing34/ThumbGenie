import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import SoftBackdrop from "./SoftBackdrop";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";


type AuthMode = "login" | "register";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const { user, login, signUp } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'login') {
      login(formData)
    } else {
      signUp(formData)
    }
  };



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user])

  return (
    <>


      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0b0c1f] to-black px-4">
        <SoftBackdrop />
        <form
          onSubmit={handleSubmit}
          className="
          sm:w-[360px] w-full text-center
          bg-gradient-to-b from-[#1a1b2e] to-[#0f1022]
          border border-white/10
          rounded-2xl px-8
          shadow-[0_0_80px_rgba(168,85,247,0.18)]
          backdrop-blur-xl
        "
        >
          {/* Title */}
          <h1 className="text-white text-3xl mt-10 font-medium">
            {mode === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-violet-300/70 text-sm mt-2">
            Please sign in to continue
          </p>

          {/* Name (Register only) */}
          {mode === "register" && (
            <div className="flex items-center mt-6 w-full bg-white/5 border border-white/10 h-12 rounded-full pl-6 gap-2 focus-within:border-pink-500 transition">
              <User className="size-4 text-violet-300" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-violet-400 outline-none"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center w-full mt-4 bg-white/5 border border-white/10 h-12 rounded-full pl-6 gap-2 focus-within:border-pink-500 transition">
            <Mail className="size-4 text-violet-300" />
            <input
              type="email"
              name="email"
              placeholder="Email id"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white placeholder-violet-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-4 w-full bg-white/5 border border-white/10 h-12 rounded-full pl-6 gap-2 focus-within:border-pink-500 transition">
            <Lock className="size-4 text-violet-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white placeholder-violet-400 outline-none"
            />
          </div>

          {/* Forgot password */}
          <div className="mt-4 text-left">
            <button
              type="button"
              className="text-sm text-pink-400 hover:text-pink-300 transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="
            mt-4 w-full h-11 rounded-full text-white
            bg-gradient-to-r from-pink-500 to-fuchsia-600
            hover:from-pink-600 hover:to-fuchsia-700
            shadow-[0_0_30px_rgba(236,72,153,0.45)]
            transition
          "
          >
            {mode === "login" ? "Login" : "Sign up"}
          </button>

          {/* Toggle auth mode */}
          <p
            onClick={() =>
              setMode((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-violet-300/70 text-sm mt-4 mb-10 cursor-pointer"
          >
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-pink-400 hover:text-pink-300 ml-1 transition">
              Click here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
