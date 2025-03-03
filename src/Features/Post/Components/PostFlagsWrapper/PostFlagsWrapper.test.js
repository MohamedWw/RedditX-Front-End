import { render, screen, fireEvent } from "@testing-library/react";
import TestingComponent from "Features/Post/TestingComponent";

// Import components
import PostFlagsWrapper from "./PostFlagsWrapper";

const mockFlairHandler = jest.fn();


describe("Post flag wrapper", () => {
  it("should contain 6 buttons", async () => {
    render(
      <TestingComponent>
        <PostFlagsWrapper flairHandler={mockFlairHandler} />
      </TestingComponent>
    );
    expect(screen.getAllByRole("button").length).toBe(6);
  });

  it("should not call flairHandler when flair button is clicked & no community selected", () => {
    render(
      <TestingComponent>
        <PostFlagsWrapper flairHandler={mockFlairHandler} />
      </TestingComponent>
    );
    fireEvent.click(screen.getByTestId("flair-button"));
    expect(mockFlairHandler).not.toHaveBeenCalledTimes(1);
  });
});
