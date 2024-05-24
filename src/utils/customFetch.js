import axios from "axios";

const customFetch = axios.create({
    baseURL: "https://strapi-store-server.onrender.com/api",
    headers: {
        Accept: "application/json",
    },
});
export default customFetch;
