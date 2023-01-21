import { render, screen } from "test-utils";
import Spinner from "./index";

describe("Spinner", () => {
    test("should renders correctly", () => {
        render(<Spinner />);

        const svgElement = screen.getByTestId("loading-icon");
        expect(svgElement).toBeInTheDocument();
    });
});
