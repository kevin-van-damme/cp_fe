"use client";
import Link from "next/link";
export default function RegisterForm() {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Become a member</h1>
      <form className="space-y-5" noValidate action="">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email address <i className="text-red-700">*</i>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">
            The email address is not made public. It will only be used if you need to be contacted about your account or for opt-in notifications.
          </p>
        </div>

        <div>
          <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
            Username <i className="text-red-700">*</i>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">
            Several special characters are allowed, including space, period (.), hyphen (-), apostrophe (’), underscore (_) and the @ sign.
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password <i className="text-red-700">*</i>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
            Confirm password <i className="text-red-700">*</i>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="picture" className="block mb-1 font-medium text-gray-700">
            Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/gif, image/jpeg, image/webp"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">Max size: 5MB</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Create New Account
        </button>
      </form>

      <p className="text-center mt-5 flex justify-center gap-1">
        Already have an account?
        <Link href="/login" className="text-blue-600 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
