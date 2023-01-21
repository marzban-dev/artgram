import { generateMockArt } from "mocks/utils";
import { render, screen } from "test-utils";
import user from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import Art from ".";

describe("Art", () => {
    const mockArt = generateMockArt(2);

    test("should renders correctly", () => {
        render(<Art {...mockArt} />);
        const sectionElement = screen.getByRole("img");
        expect(sectionElement).toBeInTheDocument();
    });

    test("should renders loading overlay at first", () => {
        render(<Art {...mockArt} />);
        const sectionElement = screen.getByTestId("loading-overlay");
        expect(sectionElement).toBeInTheDocument();
    });

    test("should change route after clicking on the art", async () => {
        user.setup();

        render(<Art {...mockArt} />);

        const sectionElement = screen.getByTestId("container");

        await user.click(sectionElement);

        expect(mockRouter).toMatchObject({
            asPath: "/art/2",
        });
    });

    // test("should remove loading overlay after image loaded", async () => {
    //     render(<Art {...mockArt} />);
    //     const sectionElement = screen.getByTestId("loading-overlay");
    //     await waitFor(() => expect(sectionElement).not.toBeInTheDocument());
    // });
});
