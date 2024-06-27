import MockAdapter from 'axios-mock-adapter';
import {faker} from '@faker-js/faker';
const timeDelay = 1000;

const generateFakeData = (count: number) => {
    const data = [];

    for (let i = 0; i < count; i++) {
        const fakeUnit = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
        };

        data.push(fakeUnit);
    }

    return data;
};

const perPage = 10;
const totalCount = 10;
const pageCount = Math.ceil(totalCount / perPage);

const data = {
    data: generateFakeData(totalCount),
    pagination: {
        page: 1,
        perPage,
        total: totalCount,
        pageCount,
        hasPreviousPage: false,
        hasNextPage: pageCount > 1,
    },
};

export const getAllMock = async (mock: MockAdapter, path: string) => {
    return mock.onGet(path).reply(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, data]);
            }, timeDelay);
        });
    });
};

export const getMock = async (mock: MockAdapter, path: string) => {
    return mock.onGet(path).reply(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, generateFakeData(1).shift()]);
            }, timeDelay);
        });
    });
};

export const putMock = async (mock: MockAdapter, path: string) => {
    return mock.onPut(path).reply(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, generateFakeData(1).shift()]);
            }, timeDelay);
        });
    });
};

export const postMock = async (mock: MockAdapter, path: string) => {
    return mock.onPost(path).reply(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, generateFakeData(1).shift()]);
            }, timeDelay);
        });
    });
};
