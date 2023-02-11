import { render, screen } from "test-utils";
import user from "@testing-library/user-event";
import { useSession } from "next-auth/react";
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

    test("shouldn't show fill-icon when user status is unauthenticated", async () => {
        // @ts-ignore
        useSession.mockImplementation(() => ({
            data: {
                expires: new Date(Date.now() + 2 * 86400).toISOString(),
                user: { username: "admin" },
            },
            status: "unauthenticated",
        }));

        user.setup();

        render(<Like id={1} />);

        const buttonElement = screen.getByRole("button");

        await user.click(buttonElement);

        const iconStrokeElement = await screen.findByTestId("icon-stroke");
        const iconFillElement = screen.queryByTestId("icon-fill");

        expect(iconStrokeElement).toBeInTheDocument();
        expect(iconFillElement).toBeNull();
    });
});
