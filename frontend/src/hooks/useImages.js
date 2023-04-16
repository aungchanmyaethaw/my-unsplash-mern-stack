import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteImage, getImages, uploadImage } from "../api/images";

export const useGetImages = (searchQuery) => {
  return useQuery(["images", searchQuery], () => getImages(searchQuery));
};

export const useUploadImage = () => {
  return useMutation(uploadImage);
};

export const useDeleteImage = () => {
  return useMutation(deleteImage);
};
