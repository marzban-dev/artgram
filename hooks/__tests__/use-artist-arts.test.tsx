import { useArtistArtsQuery } from "hooks/use-artist-arts";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useArtistArts", () => {
    test("should correctly fetch pages", async () => {
        const { result } = renderHook(() => useArtistArtsQuery(1), {
            wrapper: TestWrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data!.pages).toHaveLength(1);

        await result.current.fetchNextPage();

        await waitFor(() => {
            expect(result.current.data!.pages).toHaveLength(2);
        });
    });
});
