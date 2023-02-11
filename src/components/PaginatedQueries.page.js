import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";


export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const fetchColors = (pageNumber) => axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);

    const { isLoading, isError, error, data, isFetching } = useQuery(
        ["colors", pageNumber],
        () => fetchColors(pageNumber),
        {
            keepPreviousData: true
        }
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    return (
        <div>
            {
                data?.data.map((color) => <div key={color.id}>{color.label}</div>)
            }
            <div>
                <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Previous Page</button>
                <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next Page</button>
            </div>
            {isFetching && 'Loading...'}
        </div>
    )
}