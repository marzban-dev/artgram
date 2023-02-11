import { useLikeArtMutation } from "hooks/use-like-art";
import { useSaveArtMutation } from "hooks/use-save-art";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useSaveArt", () => {
    test("should respond correctly", async () => {
        const { result } = renderHook(() => useSaveArtMutation(), {
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