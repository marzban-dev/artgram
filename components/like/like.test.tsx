import { render, screen } from "test-utils";
import user from "@testing-library/user-event";
import Like from ".";

describe("Like", () => {
    test("should renders correctly", () => {
        render(<Like id={1} />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeInTheDocument();
    });

    test("should state changes after click", async () => {
        user.setup();

        render(<Like id={1} />);

        const buttonElement = screen.getByRole("button");

        await user.click(buttonElement);

        const iconFillElement = await screen.findByTestId("icon-fill");

        expect(iconFillElement).toBeInTheDocument();
    });
});
