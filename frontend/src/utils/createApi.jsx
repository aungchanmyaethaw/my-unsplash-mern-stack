import axios from "axios";

export default axios.create({
  baseURL: `https://api.pexels.com`,
  headers: {
    Authorization: "563492ad6f91700001000001ddfed4927d0344d59cba5ca24dabaa1e",
  },
});
