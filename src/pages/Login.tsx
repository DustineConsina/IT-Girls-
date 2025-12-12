import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(/logo-it.jpeg)',
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Form Container */}
      <form
        onSubmit={handleLogin}
        className="relative backdrop-blur-sm bg-white/30 p-8 rounded-lg shadow-2xl w-96 z-10 border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-white/30 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-white/30 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg">
          Login
        </button>

        <p className="mt-4 text-center text-white drop-shadow-lg">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-100 font-semibold hover:text-white underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
