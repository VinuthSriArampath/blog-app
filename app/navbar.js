"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function NavBar({ onPostCreated }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const { error } = await supabase.from("post").insert([
      { title, content, is_premium: false, created_by: user.id },
    ]);

    if (error) {
      console.error(error);
    } else {
      alert("Post created!");
      setModalOpen(false);
      setTitle("");
      setContent("");
      onPostCreated();
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="antialiased sticky top-0">
      <nav className="px-4 lg:px-6 py-2.5 bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <a href="/" className="flex mr-4">
              <img
                src="logo.png"
                className="mr-3 h-8"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Bloggie
              </span>
            </a>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                aria-hidden="true"
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
              Create Blog
            </button>
            <button onClick={handleLogOut} className="ml-4">
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create Your Blog"
          content={
            <div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm text-white font-bold"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring-indigo-500 sm:text-sm text-gray-200 bg-gray-700"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm text-white font-bold"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring-indigo-500 sm:text-sm text-gray-200 bg-gray-700"
                  required
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={createPost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Create
                </button>
              </div>
            </div>
          }
        />
      )}
    </header>
  );
}
