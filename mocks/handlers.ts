import { rest } from "msw";
import { IArt } from "api/arts.types";
import { generateMockArt } from "./utils";

const baseUrl = "https://artgram.iran.liara.run";

export const handlers = [
    rest.get(baseUrl + "/", (req, res, ctx) => {
        const arts = Array.from({ length: 10 }).map(() => generateMockArt());

        return res(ctx.status(200), ctx.json({ results: arts }));
    }),
    rest.get(baseUrl + "/:id", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(generateMockArt(Number(req.params.id))));
    }),
    rest.get(baseUrl + "/likes/:id", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ count: 500 }));
    }),
    rest.post(baseUrl + "/like/", (req, res, ctx) => {
        return res(ctx.status(200), ctx.body("ok"));
    }),
    rest.delete(baseUrl + "/like/:id", (req, res, ctx) => {
        return res(ctx.status(200), ctx.body("ok"));
    }),
    rest.post(baseUrl + "/user/follow/user/:id", (req, res, ctx) => {
        return res(ctx.status(200), ctx.body("ok"));
    }),
    rest.post(baseUrl + "/user/follow/artist/:id", (req, res, ctx) => {
        return res(ctx.status(200), ctx.body("ok"));
    }),
    rest.post(baseUrl + "/auth/jwt/create/", (req, res, ctx) => {}),
    rest.post(baseUrl + "/auth/users/", (req, res, ctx) => {}),
    rest.get(baseUrl + "/auth/users/me/", (req, res, ctx) => {}),
];
