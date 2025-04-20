import Table from "./Table.tsx";
import {fetchSearchData} from "../lib/search.service.ts";
import * as React from "react";
import {useQuery} from "@tanstack/react-query";

const TableWrapper: React.FC = () => {

    const {data: personData, isLoading, error} = useQuery({
        queryKey: ['personData'],
        queryFn: fetchSearchData
    });


    if(isLoading) {
        return <div> Loading table data</div>
    }

    if(error) {
        return <div> error fetching table data</div>
    }

    return (
        <div>
            <Table personData={personData} />
        </div>
    );
}

export default TableWrapper