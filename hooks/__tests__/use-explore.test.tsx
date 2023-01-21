import { useExplore } from "hooks/use-explore";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useExplore", () => {
    test("correctly fetch pages", async () => {
        const { result } = renderHook(() => useExplore(), {
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
