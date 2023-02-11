import { faker } from "@faker-js/faker";
import { rest } from "msw";
import { generateMockArt, generateMockFollower, generateMockSavedArt } from "./utils";

const baseUrl = "https://artgram.iran.liara.run";
const frontBaseUrl = "http://localhost:3000";

export const handlers = [
    // Mock apiRoutes api
    rest.get(frontBaseUrl + "/api/artist-picture", (req, res, ctx) => {
        return res(ctx.status(200), ctx.body(faker.internet.url()));
    }),
    rest.get(frontBaseUrl + "/api/artist", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                background: faker.internet.url(),
                age: faker.datatype.number({ min: 18, max: 120 }),
                quote: faker.lorem.paragraph(2),
                description: faker.lorem.paragraphs(),
                googlearts: faker.internet.url(),
            })
        );
    }),

    // Mock art api
    rest.get(baseUrl + "/", (req, res, ctx) => {
        const arts = Array.from({ length: 10 }).map(() => generateMockArt());

        return res(ctx.status(200), ctx.json({ results: arts }));
    }),
    rest.get(baseUrl + "/:id", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(generateMockArt(Number(req.params.id))));
    }),
    rest.post(baseUrl + "/art/like/", (req, res, ctx) => {
        return res(ctx.status(201));
    }),
    rest.delete(baseUrl + "/art/like/:id", (req, res, ctx) => {
        return res(ctx.status(204));
    }),

    // Mock user api
    rest.post(baseUrl + "/user/follow/user/:id", (req, res, ctx) => {
        return res(ctx.status(201));
    }),
    rest.post(baseUrl + "/user/follow/artist/:id", (req, res, ctx) => {
        return res(ctx.status(201));
    }),
    rest.get(baseUrl + "/artist/:id", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                id: Number(req.params.id),
                name: faker.name.fullName(),
                wikipedia: "https://en.wikipedia.org/wiki/some_artist",
            })
        );
    }),
    rest.get(baseUrl + "/user/get/:id", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                first_name: faker.name.firstName(),
                username: req.params.id,
                profile_img: faker.internet.url(),
                header_img: faker.internet.url(),
                date_joined: faker.date.recent(),
                bio: faker.lorem.paragraph(),
                link: faker.internet.url(),
                location: faker.address.county(),
            })
        );
    }),
    rest.get(baseUrl + "/user/:id/followers", (req, res, ctx) => {
        const followers = Array.from({ length: 10 }).map(() => generateMockFollower());
        return res(ctx.status(200), ctx.json({ results: followers }));
    }),
    rest.get(baseUrl + "/artist/:id/followers", (req, res, ctx) => {
        const followers = Array.from({ length: 10 }).map(() => generateMockFollower());
        return res(ctx.status(200), ctx.json({ results: followers }));
    }),
    rest.get(baseUrl + "/user/reposts/", (req, res, ctx) => {
        const savedArts = Array.from({ length: 10 }).map(() => generateMockSavedArt());
        
        return res(ctx.status(200), ctx.json({ results: savedArts }));
    }),
    rest.post(baseUrl + "/user/reposts/", (req, res, ctx) => {
        return res(ctx.status(201));
    }),
    rest.delete(baseUrl + "/user/:id", (req, res, ctx) => {
        return res(ctx.status(204));
    }),

    // Mock auth api
    rest.post(baseUrl + "/auth/jwt/create/", (req, res, ctx) => {}),
    rest.post(baseUrl + "/auth/users/", (req, res, ctx) => {}),
    rest.get(baseUrl + "/auth/users/me/", (req, res, ctx) => {}),
];
