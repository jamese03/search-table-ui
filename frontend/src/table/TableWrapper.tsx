import * as React from "react";
import Table from "./Table.tsx";
import {useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchSearchData} from "../lib/search.service.ts";

const TableWrapper: React.FC = () => {
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name");
    const age = searchParams.get("age");
    const country = searchParams.get("country");
    const {data, isLoading, error} = useQuery({
        queryKey: ["searchResults", {name, age, country}],
        queryFn: () => fetchSearchData({name, age, country}),
        enabled: !!(name || age || country),
    });
    const personData = data?.persons;
    if (isLoading) {
        return <div> loading </div>
    }
    if (error) {
        return <div> error fetching search results </div>
    }
    return (
        <>
            <Table personData={personData}/>
        </>
    )
}

export default TableWrapper;