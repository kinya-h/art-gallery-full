import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../lib/hooks";
import { searchArtworks } from "../actions/artwork-service";
import { Artwork } from "../types/artwork";

interface searchProps {
  onSearchArtworks: (artworks: Artwork[]) => void;
}

const Search = ({ onSearchArtworks }: searchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSearchArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm });
    const response = await dispatch(searchArtworks({ searchTerm }));
    onSearchArtworks(response.payload as Artwork[]);
  };
  console.log(searchParams);
  return (
    <div>
      <form
        onSubmit={(e) => handleSearchArtwork(e)}
        className="relative w-xs  max-w-xs flex border border-primary rounded-lg overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input focus:border-none w-40 input-sm px-10 my-1 "
        />
        <button
          className="bg-primary hover:bg-secondary px-3  py-0 flex items-center justify-center"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-gray-500"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <div
          className="sr-only"
          id="radix-:ro:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        ></div>
      </form>
    </div>
  );
};

export default Search;
