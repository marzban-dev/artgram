import { render, screen } from "test-utils";
import Placeholder from ".";

describe("Placeholder", () => {
    test("should renders correctly", () => {
        render(<Placeholder />);
        const divElement = screen.getByTestId("loading-overlay");
        expect(divElement).toBeInTheDocument();
    });
});
