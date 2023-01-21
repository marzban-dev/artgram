import { useArtLikes } from "hooks/use-art-likes";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useArtLikes", () => {
    test("correctly return state", async () => {
        const { result } = renderHook(useArtLikes, {
            wrapper: TestWrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
    });
});
