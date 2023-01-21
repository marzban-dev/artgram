import { useArtsQuery } from "hooks/use-arts";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useArts", () => {
    test("correctly return arts", async () => {
        const { result } = renderHook(() => useArtsQuery(1), {
            wrapper: TestWrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data!.pages).toHaveLength(1);

        result.current.fetchNextPage();

        await waitFor(() => {
            expect(result.current.data!.pages).toHaveLength(2);
        });
    });
});
