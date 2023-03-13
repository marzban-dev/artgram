import { render, screen } from "test-utils";
import user from "@testing-library/user-event";
import TestIcon from "public/assets/icon/droplet.svg";
import ArtDetail from ".";

describe("ArtDetail", () => {
    test("should renders correctly", () => {
        render(<ArtDetail id={1} text="lorem ipsum" icon={TestIcon} iconSize={10} />);
        const containerElement = screen.getByTestId("art-detail-container");
        expect(containerElement).toBeInTheDocument();
    });

    test("should display text tooltip when mouse hover", async () => {
        user.setup();

        render(
            <div>
                <div id="art-1" />
                <ArtDetail id={1} text="lorem ipsum" icon={TestIcon} iconSize={10} />
            </div>
        );

        const containerElement = screen.getByTestId("art-detail-container");

        await user.hover(containerElement);

        const textElement = await screen.findByTestId("art-detail-text");

        expect(textElement).toBeInTheDocument();
    });
});
