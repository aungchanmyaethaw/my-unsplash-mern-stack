import React, { useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDeleteImage } from "../hooks/useImages";

const DeleteModal = ({ setDeleteStatus, id, refetch }) => {
  const deleteImageMutation = useDeleteImage();

  const onRemoveHandle = () => {
    deleteImageMutation.mutate(id);
  };

  useEffect(() => {
    if (deleteImageMutation.isSuccess) {
      refetch();
      setTimeout(() => {
        setDeleteStatus(false);
      }, 2000);
    }
  }, [deleteImageMutation.isSuccess]);

  return (
    <div
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80 font-myfont"
      onClick={() => setDeleteStatus(false)}
    >
      <div
        className="bg-white rounded-lg p-8 flex flex-col items-center w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <RiDeleteBin5Line size={96} fill={"#bfbfbf"} className="mb-8" />
        <p className="font-medium text-xl text-center mb-12 text-[#333]">
          Are you sure want to delete this image?
        </p>
        {deleteImageMutation.isSuccess && (
          <p className="py-2 text-green-600">{deleteImageMutation.data.msg}</p>
        )}
        {deleteImageMutation.isError && (
          <p className="py-2 text-red-400">
            {deleteImageMutation.error.message}
          </p>
        )}
        <div className="flex gap-4">
          <button
            className="font-medium bg-[#E4E4E4] px-4 py-2 rounded"
            onClick={() => setDeleteStatus(false)}
          >
            Cancel
          </button>
          <button
            className={`font-medium bg-[#BC3131] px-4 py-2 rounded text-white disabled:cursor-not-allowed ${
              deleteImageMutation.isLoading ? "bg-opacity-75" : null
            }`}
            disabled={deleteImageMutation.isLoading}
            onClick={onRemoveHandle}
          >
            {deleteImageMutation.isLoading ? (
              <span>Deleting...</span>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
