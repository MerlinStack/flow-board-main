import { FaGoogle, FaFacebookF, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Signup() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#6c63ff] via-[#7b7fff] to-[#b8b8ff] flex items-center justify-center px-4 relative">

      {/* Floating Shapes */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-blue-700 rounded-3xl rotate-12 blur-[2px] opacity-80"></div>

      <div className="absolute bottom-10 left-0 w-32 h-32 border-[18px] border-blue-500 rounded-full"></div>

      <div className="absolute bottom-20 right-20 w-20 h-20 bg-black rounded-full opacity-70 blur-sm"></div>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white/20 backdrop-blur-lg border border-white/30 rounded-[30px] shadow-2xl p-10 md:p-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            <h1 className="text-5xl font-bold text-black mb-10">
              Sign Up
            </h1>

            {/* Full Name */}
            <div className="flex items-center bg-white rounded-full px-5 py-4 mb-6 shadow-md">
              <FaUser className="text-gray-400 text-xl" />

              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none ml-4 w-full text-gray-700"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-white rounded-full px-5 py-4 mb-6 shadow-md">
              <MdEmail className="text-gray-400 text-2xl" />

              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none ml-4 w-full text-gray-700"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white rounded-full px-5 py-4 mb-6 shadow-md">
              <FaLock className="text-gray-400 text-xl" />

              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none ml-4 w-full text-gray-700"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center bg-white rounded-full px-5 py-4 shadow-md">
              <FaLock className="text-gray-400 text-xl" />

              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none ml-4 w-full text-gray-700"
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center">

            {/* Signup Button */}
            <button className="bg-black hover:bg-gray-900 transition-all text-white py-4 rounded-full text-2xl font-semibold shadow-lg">
              Sign Up
            </button>

            {/* Login Text */}
            <p className="text-center mt-6 text-gray-800 text-lg">
              Already have an account?{" "}
              <span className="font-semibold cursor-pointer">
                Log in
              </span>
            </p>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-[1px] bg-gray-500"></div>

              <p className="mx-4 text-black text-xl">Or</p>

              <div className="flex-1 h-[1px] bg-gray-500"></div>
            </div>

            {/* Google Button */}
            <button className="flex items-center justify-center gap-4 border border-gray-500 py-4 rounded-full text-lg bg-white/40 hover:bg-white/60 transition-all mb-5">
              <FaGoogle className="text-red-500 text-2xl" />
              Sign up with Google
            </button>

            {/* Facebook Button */}
            <button className="flex items-center justify-center gap-4 border border-gray-500 py-4 rounded-full text-lg bg-white/40 hover:bg-white/60 transition-all">
              <FaFacebookF className="text-blue-700 text-2xl" />
              Sign up with Facebook
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}