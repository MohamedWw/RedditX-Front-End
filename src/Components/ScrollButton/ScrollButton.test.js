import { render, screen, fireEvent } from "@testing-library/react";
import TestingComponent from "Features/settings/Components/TestingComponent";
import ScrollButton from "./ScrollButton";

jest.mock("Features/Authentication/Contexts/Authentication", () => ({
  __esModule: true, // this property makes it work
  useAuth: function () {
    return {
      getUserName: jest.fn().mockReturnValue("username"),
      getToken: jest.fn().mockReturnValue("token"),
      isLoggedIn: jest.fn().mockReturnValue(true),
    };
  },
  AuthProvider: ({ children }) => {
    return (
      <mock-authprovider data-testid="auth-provider">
        {children}
      </mock-authprovider>
    );
  },
}));

jest.mock("Hooks/useFetchFunction.js", () => () => {
  return [
    "data",
    "error",
    "loading",
    jest.fn().mockReturnValue({
      data: {
        name: "test",
        type: "subreddit",
      },
    }),
  ];
});

describe("ScrollButton User", () => {
  it("test AboutUser renders correctly", async () => {
    render(
      <TestingComponent>
        <ScrollButton />
      </TestingComponent>
    );
  });
});
