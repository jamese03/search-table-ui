export type Person = {
    name: string;
    age: number;
    country: string;
};

export type SearchDataParams = {
    name: string | null;
    age: string | null;
    country: string | null;
    page?: number | null;
    pageSize?: number | null;
}