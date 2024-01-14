import React from "react";
import renderer from "react-test-renderer";
import DashboardScreen from "../app/screens/Protected/DashboardScreen";

describe("DashboardScreen", () => {
  it("renders the screen", () => {
    const screen = renderer.create(<DashboardScreen />).toJSON();
    expect(screen.children.length).not.toBe(0);
  });
});
