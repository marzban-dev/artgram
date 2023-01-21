import { faker } from "@faker-js/faker";
import { IArt } from "api/arts.types";

export const generateMockArt = (id?: number) : IArt => {
    return {
        id: id ? id : faker.datatype.number({ min: 1, max: 100000 }),
        artist: {
            id: faker.datatype.number({ min: 1, max: 100000 }),
            name: faker.name.fullName(),
            wikipedia: faker.internet.url(),
        },
        location: faker.address.country(),
        picture: faker.image.imageUrl(undefined, undefined, undefined, true),
        reference: faker.internet.url(),
        title: faker.lorem.words(),
        type: faker.lorem.words(2),
        year: faker.date.recent().toString(),
    };
};
