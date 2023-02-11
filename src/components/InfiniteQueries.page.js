import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";


export const InfiniteQueriesPage = () => {

    const fetchColors = ({ pageParam = 1 }) => axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);

    const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
        ["colors"],
        fetchColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            }
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
                data?.pages.map((group, index) => {
                    return <Fragment key={index}>
                        {group.data.map((color) => {
                            return <h2 key={color.id}>
                                {color.id} {color.label}
                            </h2>
                        })}
                    </Fragment>
                })
            }
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More</button>
            </div>
            <div>
                {
                    isFetching && !isFetchingNextPage ? 'Fetching...' : null
                }
            </div>
        </div>
    )
}