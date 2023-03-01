import { faker } from "@faker-js/faker";
import { IArt } from "api/arts.types";
import { ISavedArt, ISimpleUser, IUser } from "api/user.types";

export const generateMockArt = (id?: number): IArt => {
    return {
        id: id ? id : faker.datatype.number({ min: 1, max: 100000 }),
        artist: {
            id: faker.datatype.number({ min: 1, max: 100000 }),
            name: faker.name.fullName(),
            following: false,
            image: faker.image.imageUrl(undefined, undefined, undefined, true),
        },
        image: {
            height: faker.datatype.number({ min: 1000, max: 2000 }),
            width: faker.datatype.number({ min: 1000, max: 2000 }),
            id: faker.datatype.number({ min: 1, max: 100000 }),
            thumbnail: faker.image.imageUrl(undefined, undefined, undefined, true),
            url: faker.internet.url(),
        },
        location: faker.address.country(),
        form: faker.lorem.word(),
        school: faker.lorem.word(2),
        technique: faker.lorem.word(2),
        date: faker.date.recent().toString(),
        reference: faker.internet.url(),
        title: faker.lorem.words(),
        type: faker.lorem.words(2),
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
        followers_count: faker.datatype.number({ min: 0, max: 500 }),
        followings_count: faker.datatype.number({ min: 0, max: 500 }),
        repost_count: faker.datatype.number({ min: 0, max: 500 }),
        following: faker.datatype.boolean(),
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

export const generateMockFollower = (username?: string): ISimpleUser => {
    return {
        following: faker.datatype.boolean(),
        first_name: faker.name.firstName(),
        profile_img: faker.internet.url(),
        username: username ? username : faker.internet.userName(),
    };
};
