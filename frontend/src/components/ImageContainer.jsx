import React, { useState } from "react";
import { useGetImages } from "../hooks/useImages";
import { MdImageNotSupported } from "react-icons/md";
import AddImageModel from "./AddImageModel";
import { useAppContext } from "../contexts/AppContextProvider";
import { ClipLoader } from "react-spinners";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteModal from "./deleteModal";

const ImageContainer = () => {
  const { addModelStatus, searchQuery } = useAppContext();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const {
    isLoading,
    data: images,
    refetch,
    error,
    isError,
  } = useGetImages(searchQuery);

  if (isLoading) {
    return (
      <section className="absolute z-0 flex flex-col items-center justify-center gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <ClipLoader />
      </section>
    );
  }

  if (!isLoading && isError) {
    return (
      <section className="absolute z-0 flex flex-col items-center justify-center w-full h-full gap-2 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2">
        <h2 className="text-2xl font-medium text-red-600">{error.message}</h2>
      </section>
    );
  }

  if (!isLoading && images.length === 0) {
    return (
      <>
        <section className="absolute z-0 flex flex-col items-center justify-center gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <MdImageNotSupported size={60} className="text-gray-400" />
          <h2 className="text-2xl font-medium text-gray-600">
            Currently Empty...
          </h2>
        </section>
        {addModelStatus ? <AddImageModel refetch={refetch} /> : null}
      </>
    );
  }

  const handleDelete = (id) => {
    setDeleteStatus(true);
    setDeleteId(id);
  };

  return (
    <section className="grid grid-cols-3 auto-rows-[240px] gap-8 ">
      {images?.map((image, index) => (
        <div
          className={`group hover relative min-w-full  rounded-lg overflow-hidden ${
            (index + 1) % 2 !== 0 ? "row-span-1" : "row-span-2"
          } `}
          key={image._id}
        >
          <div className="absolute inset-0 hidden w-full h-full p-4 cursor-pointer bg-opacity-40 bg-zinc-800 group-hover:block">
            <button
              className="flex items-center justify-center w-8 h-8 ml-auto bg-red-100 rounded-lg"
              onClick={() => handleDelete(image._id)}
            >
              <BsFillTrashFill className="text-red-600" />
            </button>
          </div>
          <img
            src={image.image_url}
            alt={image.label}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      {addModelStatus ? <AddImageModel refetch={refetch} /> : null}
      {deleteStatus ? (
        <DeleteModal
          setDeleteStatus={setDeleteStatus}
          id={deleteId}
          refetch={refetch}
        />
      ) : null}
    </section>
  );
};

export default ImageContainer;
