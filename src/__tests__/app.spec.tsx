import { render } from "@testing-library/react";
import { describe, test } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

describe("navigation", () => {
  test("includes nav bar links", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/", "/home", "/operators"]}>
        <App />
      </MemoryRouter>
    );

    const homeLink = getByTestId("home");
    const operatorsLink = getByTestId("operators");

    expect(homeLink).toBeInTheDocument();
    expect(operatorsLink).toBeInTheDocument();
  });
});
