import { useUnsaveArtMutation } from "hooks/use-unsave-art";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useUnlikeArt", () => {
    test("should respond correctly", async () => {
        const { result } = renderHook(() => useUnsaveArtMutation(), {
            wrapper: TestWrapper,
        });

        expect(result.current.data).toBeUndefined();

        await result.current.mutateAsync({
            id: 1,
            token: "some-token",
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });
    });
});
