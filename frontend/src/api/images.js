import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_API_BASE_URL;

export const getImages = async (searchQuery) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/upload?q=${searchQuery}`);
    return res.data.images;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadImage = async (data) => {
  try {
    const Formdata = new FormData();
    Formdata.append("file", data.file);
    Formdata.append("label", data.label);

    const res = await axios.post(`${BASE_URL}/api/upload`, Formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteImage = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/upload/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
