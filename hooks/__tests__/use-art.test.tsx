import { useArtQuery } from "hooks/use-art";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useArt", () => {
    test("correctly return art", async () => {
        const { result } = renderHook(() => useArtQuery(3), {
            wrapper: TestWrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data!.id).toBe(3);
    });
});
