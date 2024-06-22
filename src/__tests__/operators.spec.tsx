import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, test } from "@jest/globals";

import Operators from "../pages/operators";
import { Form } from "../components";
import { act } from "react";

jest.mock("../data.json", () => ({
  operators: [
    {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1988-01-01",
      gameName: "Lucky",
      approvalStatus: 0,
    },
    {
      firstName: "Mary",
      lastName: "Tulip",
      dateOfBirth: "1999-03-02",
      gameName: "Sol",
      approvalStatus: 1,
    },
  ],
}));

describe("Operators Page", () => {
  beforeEach(() => {
    const defaultProps = {
      type: "Add",
      state: true,
      selected: null,
      setState: jest.fn(),
      setData: jest.fn(),
    };

    render(<Operators />);
  });

  test("should display a list of operators", async () => {
    render(<Operators />);

    const row = screen
      .getAllByRole("row")
      .find((row) => row.textContent && row.textContent.includes("#1"));

    if (row) {
      expect(await within(row).findByText("#1")).toBeInTheDocument();
      expect(within(row).getByText("John")).toBeInTheDocument();
      expect(within(row).getByText("Doe")).toBeInTheDocument();
      expect(within(row).getByText("1988-01-01")).toBeInTheDocument();
      expect(within(row).getByText("Lucky")).toBeInTheDocument();
      expect(within(row).getByText("Pending")).toBeInTheDocument();
      expect(within(row).getByText("Edit")).toBeInTheDocument();
      expect(within(row).getByText("Delete")).toBeInTheDocument();
    }
  });

  test("should edit an operator", async () => {
    const rows = screen.getAllByRole("row");
    const editRow = rows.find(
      (row) => row.textContent && row.textContent.includes("John")
    );

    if (editRow) {
      const editBtn = editRow && within(editRow).getByText("Edit");

      await act(async () => {
        if (editBtn) fireEvent.click(editBtn);

        fireEvent.change(screen.getByLabelText(/First Name \*/), {
          target: { value: "Johnny" },
        });
        fireEvent.change(screen.getByLabelText(/Last Name \*/), {
          target: { value: "Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Date of Birth/), {
          target: { value: "1988-01-01" },
        });
        fireEvent.change(screen.getByLabelText(/Game Name \*/), {
          target: { value: "Lucky" },
        });
        fireEvent.change(screen.getByLabelText(/Status/), {
          target: { value: 1 },
        });

        fireEvent.click(screen.getByText("Submit"));
      });

      await waitFor(() => {
        expect(within(editRow).queryByText("Johnny")).toBeInTheDocument();
      });
    }
  });

  test("should delete an operator", async () => {
    const rows = screen.getAllByRole("row");
    const deleteRow = rows.find(
      (row) => row.textContent && row.textContent.includes("John")
    );

    const deleteBtn = deleteRow && within(deleteRow).getByText("Delete");

    await act(async () => {
      if (deleteBtn) fireEvent.click(deleteBtn);
    });

    await waitFor(() => {
      expect(screen.queryByText("John")).not.toBeInTheDocument();
    });
  });
});

describe("Form Component", () => {
  const defaultProps = {
    type: "Add",
    state: true,
    selected: null,
    setState: jest.fn(),
    setData: jest.fn(),
  };

  beforeEach(() => {
    render(<Form {...defaultProps} />);
  });

  test("should render the form and handle submission", async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name \*/), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByLabelText(/Last Name \*/), {
        target: { value: "Doe" },
      });
      fireEvent.change(screen.getByLabelText(/Date of Birth/), {
        target: { value: "1988-01-01" },
      });
      fireEvent.change(screen.getByLabelText(/Game Name \*/), {
        target: { value: "Lucky" },
      });
      fireEvent.change(screen.getByLabelText(/Status/), {
        target: { value: 0 },
      });

      fireEvent.click(screen.getByText("Submit"));
    });

    await waitFor(() => {
      expect(defaultProps.setData).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1988-01-01",
        gameName: "Lucky",
        approvalStatus: 0,
      });
      expect(defaultProps.setState).toHaveBeenCalledWith(false);
    });
  });

  test("should reset the form when cancel is clicked", async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name \*/), {
        target: { value: "John" },
      });

      fireEvent.click(screen.getByText("Cancel"));
    });

    expect(defaultProps.setData).toHaveBeenCalledWith(null);
    expect(defaultProps.setState).toHaveBeenCalledWith(false);
    expect(screen.getByLabelText(/First Name \*/).textContent).toBe("");
  });
});
