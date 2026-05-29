import { useState } from "react";
import { EyeIcon } from "./EyeIcon";
import { Flash } from "./Flash";
import axios from "../../api/axios.js";

export function SignupForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [flash, setFlash] = useState({ msg: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setFlash({ msg: "Please fill in all fields.", type: "error" });
      return;
    }
    if (!email.includes("@")) {
      setFlash({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }

    try {
      const signupResponse = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password
      })

      setFlash({ msg: "Account created", type: "success" });
      
      setName("");
      setEmail("");
      setPassword("");

      console.log("signup success:", signupResponse.data)
    } catch (error) {
      setFlash({ msg: error?.date?.message || "Signup failed", type: "error" });
      console.error(error);
    }

  };

  return (
    <div className="flex flex-col gap-4">
      <Flash message={flash.msg} type={flash.type} />

      <div>
        <label className="block text-left text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
          Full name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setFlash({ msg: "", type: "" }); }}
          placeholder="John"
          className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
        />
      </div>

      <div>
        <label className="block text-left text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setFlash({ msg: "", type: "" }); }}
          placeholder="John@company.com"
          className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
        />
      </div>

      <div>
        <label className="block text-left text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setFlash({ msg: "", type: "" }); }}
            placeholder="Min. 8 characters"
            className="w-full h-10 px-3 pr-9 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <EyeIcon open={showPw} />
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium tracking-wide transition-all duration-200"
      >
        Create account →
      </button>

      <div className="flex items-center gap-2 text-xs text-gray-300">
        <div className="flex-1 h-px bg-gray-100" />
        or continue with
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <p className="text-xs text-center text-gray-400">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-emerald-600 font-medium hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
}