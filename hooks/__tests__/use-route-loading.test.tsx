import useRouteLoading from "hooks/use-route-loading";
import { renderHook } from "test-utils";

describe("useRouteLoading", () => {
    test("correctly return state", () => {
        const { result } = renderHook(useRouteLoading);
        expect(result.current).toBeDefined();
    });
});
