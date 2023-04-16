import React from "react";
import SearchInput from "./SearchInput";
import { useAppContext } from "../contexts/AppContextProvider";
const Navbar = () => {
  const { setAddModelStatus } = useAppContext();

  return (
    <nav className="flex items-center gap-6 py-8 mb-8 font-myfont">
      <h1 className="text-xl font-bold text-slate-800">My Unsplash</h1>
      <SearchInput />
      <button
        className="px-4 py-3 ml-auto font-semibold text-white bg-green-500 rounded-lg shadow-lg"
        onClick={() => setAddModelStatus(true)}
      >
        Add a photo
      </button>
    </nav>
  );
};

export default Navbar;
