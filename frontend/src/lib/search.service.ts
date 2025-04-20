import api from "./api.ts";

export const fetchSearchData = async () => {
    const res = await api.get("/search");
    return res.data;
}
