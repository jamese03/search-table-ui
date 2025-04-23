import api from "./api.ts";
import {SearchDataParams} from "../types.ts";


export const fetchSearchData = async (searchDataParams: SearchDataParams) => {
    let {age, country, name, page, pageSize} = searchDataParams;
    if(!page) {
        page = 1;
    }
    if(!pageSize) {
        pageSize = 200;
    }
    const res = await api.get("/search", {
        params: {
            age,
            country,
            name,
            pageSize,
            page,
        }
    });
    console.log("RES DATA IS " + res.data);
    return res.data;
}
