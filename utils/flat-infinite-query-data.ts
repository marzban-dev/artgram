import { InfiniteData } from "@tanstack/react-query";

const flatInfiniteQueryData = <T>(data: InfiniteData<{ count: number; items: T[] }>) => {
    return data.pages
        .flat()
        .map(({ items }) => items)
        .flat();
};

export default flatInfiniteQueryData;
