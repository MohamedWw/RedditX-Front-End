import axios from "API/axios";

/**
 * Function to Upvote, DownVote a reply or a mention [Not used as both aren't done]
 * @param {object} auth Context object coming from useAuth custom Hook
 * @param {Function} fetchFunction Coming from useFetchFunction custom hook
 * @param {object} dataObject The Data to be Sent in the POST request
 */
const voteMessage = (fetchFunction, dataObject, auth) => {
  if (!auth || !auth.isLoggedIn() || !auth.getToken()) return;
    fetchFunction({
      axiosInstance: axios,
      method: "POST",
      url: "http://localhost:8000/vote-message",
      requestConfig: {
        data: dataObject,
        headers: {
          "Content-Language": "en-US",
          Authorization: `Bearer ${auth.getToken()}`,
        },
      },
    });
};

export default voteMessage;