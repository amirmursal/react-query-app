import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeros = () => axios.get("http://localhost:4000/superheroes")

const fetchFriends = () => axios.get("http://localhost:4000/friends");



export const ParallelQueriesPage = () => {

    const { data: superHeros } = useQuery("super-heros", fetchSuperHeros)
    const { data: friends } = useQuery("friends", fetchFriends);

    return (
        <div>
            Parallel Queries Page
        </div>
    )
}