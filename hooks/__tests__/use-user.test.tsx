import { useUserQuery } from "hooks/use-user";
import { renderHook, waitFor } from "test-utils";
import TestWrapper from "utils/test-wrapper";

describe("useUser", () => {
    test("should correctly fetch user", async () => {
        const { result } = renderHook(() => useUserQuery("user-name"), {
            wrapper: TestWrapper,
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data?.username).toBe("user-name");
    });
});
