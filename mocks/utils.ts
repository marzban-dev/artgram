import { faker } from "@faker-js/faker";
import { IArt } from "api/arts.types";
import { IFollower, ISavedArt, IUser } from "api/user.types";

export const generateMockArt = (id?: number): IArt => {
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
        likes_count: faker.datatype.number({ min: 1, max: 100000 }),
        user_like: true,
        user_repost: true,
    };
};

export const generateMockSavedArt = (id?: number): ISavedArt => {
    return {
        art: generateMockArt(),
        created_date: faker.date.recent().toString(),
        id: id ? id : faker.datatype.number({ min: 1, max: 100000 }),
        owner: generateMockUser(),
        text: faker.lorem.lines(1),
    };
};

export const generateMockUser = (username?: string): IUser => {
    return {
        username: username ? username : faker.internet.userName(),
        bio: faker.lorem.lines(),
        date_joined: faker.date.recent().toString(),
        first_name: faker.name.firstName(),
        header_img: faker.internet.url(),
        link: faker.internet.url(),
        profile_img: faker.internet.url(),
        location: faker.address.country(),
    };
};

export const generateMockFollower = (username?: string): IFollower => {
    return {
        first_name: faker.name.firstName(),
        profile_img: faker.internet.url(),
        username: username ? username : faker.internet.userName(),
    };
};
