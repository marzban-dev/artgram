import useImageColors from "hooks/use-image-colors";
import { render, renderHook, screen } from "test-utils";

describe("useImageColors", () => {
    test("work correctly with props", () => {
        render(<img src="/assets/img/arts/10.jpg" id="test-image" />);
        const imageElement = screen.getByRole("img");
        expect(imageElement).toBeInTheDocument();

        const { result } = renderHook(() => useImageColors("#test-image"));
        expect(result.current).toBe(null);
    });
});
