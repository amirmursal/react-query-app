import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => axios.get(`http://localhost:4000/superheroes/${heroId}`)


export const DynamicParallelQueriesPage = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )

    return (
        <div>

        </div>
    )
}