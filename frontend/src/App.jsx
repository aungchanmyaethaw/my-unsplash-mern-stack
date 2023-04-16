import React from "react";
import Navbar from "./components/Navbar";
import ImageContainer from "./components/ImageContainer";

const App = () => {
  return (
    <main className="container mx-auto  px-2  max-w-[1280px] mb-8">
      <Navbar />
      <ImageContainer />
    </main>
  );
};

export default App;
