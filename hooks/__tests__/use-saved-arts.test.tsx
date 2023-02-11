import { useExploreQuery } from "hooks/use-explore";
import { useSavedArtsQuery } from "hooks/use-saved-arts";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useSavedArts", () => {
    test("correctly fetch pages", async () => {
        const { result } = renderHook(() => useSavedArtsQuery(1), {
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
