import React, { useEffect, useRef } from "react";
import { useAppContext } from "../contexts/AppContextProvider";
import { useUploadImage } from "../hooks/useImages";

const AddImageModel = ({ refetch }) => {
  const { setAddModelStatus } = useAppContext();
  const labelRef = useRef();
  const fileRef = useRef();
  const uploadImageMutation = useUploadImage();

  useEffect(() => {
    if (uploadImageMutation.isSuccess) {
      refetch();
      setTimeout(() => setAddModelStatus(false), 2000);
    }
  }, [uploadImageMutation.isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      label: labelRef.current.value,
      file: fileRef.current.files[0],
    };
    uploadImageMutation.mutate(data);
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 font-myfont"
      onClick={() => setAddModelStatus(false)}
    >
      <div
        className="w-[480px] bg-white p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl text-slate-800">Add a new Photo</h2>
        {uploadImageMutation.isError ? (
          <div className="p-2 my-2 bg-red-500 rounded">
            <h3 className="text-center text-white">
              {uploadImageMutation.error.message}
            </h3>
          </div>
        ) : null}
        {uploadImageMutation.isSuccess ? (
          <div className="p-2 my-2 bg-green-500 rounded">
            <h3 className="text-center text-white">
              {uploadImageMutation.data.msg}
            </h3>
          </div>
        ) : null}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-2 mb-4">
            <label htmlFor="imageLabel" className="font-medium text-gray-700">
              Label
            </label>
            <input
              type="text"
              id="imageLabel"
              className="p-2 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-600"
              placeholder="Type image label"
              ref={labelRef}
              required
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2 mb-6 ">
            <label htmlFor="imageFile">Photo</label>
            <input
              type="file"
              name=""
              id="imageFile"
              className="p-2 border border-gray-600 rounded-lg cursor-pointer focus:outline-none focus:border-gray-600"
              ref={fileRef}
              required
            />
          </fieldset>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="font-medium text-slate-800"
              onClick={() => setAddModelStatus(false)}
            >
              Cancel
            </button>
            {!uploadImageMutation.isLoading ? (
              <button className="px-4 py-3 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-lg">
                Upload
              </button>
            ) : (
              <button
                className={` ${
                  uploadImageMutation.isLoading ? "!bg-opacity-50" : ""
                } px-4 py-3 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-lg`}
                disabled={uploadImageMutation.isLoading}
              >
                Uploading...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImageModel;
