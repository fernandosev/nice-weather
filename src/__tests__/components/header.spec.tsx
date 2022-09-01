import React from "react";

import { render } from "@testing-library/react-native";

import Header from "~/components/Header";

describe("Header", () => {
  it("should have title rendered", () => {
    const titleName = `Test Header`;
    const { getByTestId } = render(<Header title={titleName} />);

    const title = getByTestId("title");

    expect(title.props.children).toEqual(titleName);
  });
});
