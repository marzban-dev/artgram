import { useFollowUserMutation } from "hooks/use-follow-user";
import { useUnlikeArtMutation } from "hooks/use-unlike-art";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useFollowUser", () => {
    test("should respond correctly", async () => {
        const { result } = renderHook(() => useFollowUserMutation(1), {
            wrapper: TestWrapper,
        });

        expect(result.current.data).toBeUndefined();

        await result.current.mutateAsync({
            id: 1,
            state: true,
            token: "some-token",
            type: "user",
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });
    });
});
