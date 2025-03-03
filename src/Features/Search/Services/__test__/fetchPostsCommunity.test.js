import axios from "API/axios";
import fetchPostsCommunity from "../fetchPostsCommunity";

const mockFetchData = jest.fn(function (config) {
  return config;
});
const mockAuth = {
  isLoggedIn: () => false,
  getToken: () => false,
};
const mockAuthWithLogin = {
  isLoggedIn: () => true,
  getToken: () => false,
};
const mockAuthWithToken = {
  isLoggedIn: () => false,
  getToken: () => "token",
};
const mockAuthWithTokenAndLogin = {
  getToken: () => "token",
  isLoggedIn: () => true,
};
describe("fetchPostsCommunity", () => {
  it("Should not submit if token is missing && not logged in", () => {
    fetchPostsCommunity(mockFetchData, mockAuth, "text", "sub", "new");
    expect(mockFetchData).not.toHaveBeenCalled();
  });
  it("Should not submit if not logged in", () => {
    fetchPostsCommunity(mockFetchData, mockAuthWithLogin, "text", "sub", "new");
    expect(mockFetchData).not.toHaveBeenCalled();
  });
  it("Should not submit if not logged in and token is available", () => {
    fetchPostsCommunity(mockFetchData, mockAuthWithToken, "text", "sub", "new");
    expect(mockFetchData).not.toHaveBeenCalled();
  });
  it("Should submit if logged in and token is available", () => {
    fetchPostsCommunity(
      mockFetchData,
      mockAuthWithTokenAndLogin,
      "text",
      "sub",
      "new"
    );
    expect(mockFetchData).toBeCalledWith({
      axiosInstance: axios,
      method: "GET",
      url: `/api/search/r/sub?type=post&q=text&sort=new`,
      requestConfig: {
        headers: {
          "Content-Language": "en-US",
          Authorization: ` Bearer token`,
        },
      },
    });
  });
});
//
