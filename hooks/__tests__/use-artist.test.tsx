import { useArtistQuery } from "hooks/use-artist";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useUser", () => {
    test("should correctly fetch user", async () => {
        const { result } = renderHook(() => useArtistQuery("1"), {
            wrapper: TestWrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data?.id).toBe(1);
    });
});
