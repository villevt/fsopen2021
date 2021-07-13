import React from "react";
import { fireEvent, render, act, waitFor } from "@testing-library/react-native";

import { SignInContainer } from ".";


describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("Username and password are supplied to onSubmit handler", async () => {
      const onSubmit = jest.fn();
      const { getByTestId} = render(<SignInContainer onSubmit={onSubmit}/>);
      await act(async () => {
        fireEvent.changeText(getByTestId("usernameField"), "username");
      });
      await act(async () => {
        fireEvent.changeText(getByTestId("passwordField"), "password");
      });
      await act(async () => {
        fireEvent.press(getByTestId("submitButton"));
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "username",
        password: "password"
      });
    });
  })
});