import React from "react";
import { Square } from "ldrs/react";
import 'ldrs/react/Square.css'

function FullScreenLoading({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={`bg-white/90 z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-screen flex flex-col items-center justify-center">
        <Square
          size="35"
          stroke="5"
          strokeLength="0.25"
          bgOpacity="0.1"
          speed="1.2"
          color="black"
        />
        <h1 className="font-semibold text-gray-500 mt-3">Loading...</h1>
      </div>
    </div>
  );
}

export default FullScreenLoading;
