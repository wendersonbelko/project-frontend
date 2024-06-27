export type TPagination = {
    page: number;
    perPage: number;
    total: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
};

export type TRemove = {
    _id: string;
};

export type TGetOne = {
    _id?: string;
};
