// Import axios
import axios from "API/axios";

/**
 * Function to create a new community
 * @param {Function} fetchData Coming from useFetchFunction custom hook
 * @param {Object} objectData Object that contains the data that will be sent to the api
 * @return {Boolean}
 */

const createCommunity = (fetchData, auth, objectData) => {
  if (!auth || !auth.isLoggedIn() || !auth.getToken()) return;
  if (
    objectData.name !== undefined &&
    objectData.type !== undefined &&
    objectData.over18 !== undefined
  ) {
    if (
      typeof objectData.name === "string" &&
      typeof objectData.type === "string" &&
      typeof objectData.over18 === "boolean"
    ) {
      fetchData({
        axiosInstance: axios,
        method: "post",
        url: "/api/r/create-subreddit/",
        requestConfig: {
          data: objectData,
          headers: {
            "Content-Language": "en-US",
            authorization: `Bearer ${auth.getToken()}`,
          },
        },
      });
    }
  }
};

export default createCommunity;
