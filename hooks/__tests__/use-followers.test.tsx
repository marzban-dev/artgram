import { useFollowersQuery } from "hooks/use-followers";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useFollowers", () => {
    test("correctly fetch pages for user", async () => {
        const { result } = renderHook(() => useFollowersQuery(1, "user"), {
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
