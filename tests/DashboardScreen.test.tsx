import React from "react";
import { render } from "@testing-library/react-native";
import DashboardScreen from "../app/screens/Protected/DashboardScreen";

describe("DashboardScreen", () => {
  it("renders the header text and icons correctly", () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText("Hi Marco")).toBeTruthy();
    expect(getByText("What would you like to view?")).toBeTruthy();

    // Check for menu items by text
    expect(getByText("Ingredients")).toBeTruthy();
    expect(getByText("Recipes")).toBeTruthy();
    expect(getByText("Shopping List")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();
  });
});
