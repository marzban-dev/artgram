import { render, screen } from "test-utils";
import { faker } from "@faker-js/faker";
import MasonryGrid from ".";

describe("Masonry Grid Component", () => {
    const gridItems: JSX.Element[] = [];

    const generateItem = () => {
        const id = faker.datatype.uuid();
        const text = faker.datatype.string();
        return <li key={id}> {text} </li>;
    };

    Array.from({ length: 5 }).forEach(() => gridItems.push(generateItem()));

    test("renders masonry grid component", () => {
        render(<MasonryGrid children={gridItems} />);
        const itemElements = screen.getAllByRole("listitem");
        expect(itemElements).toHaveLength(gridItems.length);
    });
});
