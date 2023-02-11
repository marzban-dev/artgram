import { generateMockArt } from "mocks/utils";
import { render, screen } from "test-utils";
import InfiniteArts from ".";

describe("InfiniteArts", () => {
    const mockArts = Array.from({ length: 10 }).map(() => {
        return generateMockArt();
    });

    const fetchNextPage = () => {};

    test("should renders correctly", async () => {
        render(<InfiniteArts arts={mockArts} callback={fetchNextPage} count={mockArts.length} />);

        const artElements = screen.getAllByTestId("container");

        expect(artElements).toHaveLength(mockArts.length);
    });
});
