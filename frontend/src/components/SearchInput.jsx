import React from "react";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../contexts/AppContextProvider";

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <div className="flex items-center gap-4 px-2 py-3 border border-gray-400 rounded-lg">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search by name"
        className="focus:outline-none w-[15rem]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
