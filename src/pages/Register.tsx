import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    login(userRole);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(/logo-to.jpeg)',
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Form Container */}
      <form
        onSubmit={handleRegister}
        className="relative backdrop-blur-sm bg-white/30 p-8 rounded-lg shadow-2xl w-96 z-10 border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-white/30 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 placeholder-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-white/30 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 placeholder-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border border-white/30 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 placeholder-gray-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 drop-shadow-lg">
            Register as:
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={userRole === "user"}
                onChange={(e) => setUserRole(e.target.value as "user" | "admin")}
                className="mr-2"
              />
              <span className="text-gray-700">Customer</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={userRole === "admin"}
                onChange={(e) => setUserRole(e.target.value as "user" | "admin")}
                className="mr-2"
              />
              <span className="text-gray-700">Admin</span>
            </label>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-red-700 transition shadow-lg">
          Register
        </button>

        <p className="mt-4 text-center text-white drop-shadow-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-100 font-semibold hover:text-white underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
