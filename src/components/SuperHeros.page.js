import axios from "axios";
import { useEffect, useState } from "react"

export const SuperHeroesPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get("http://localhost:4000/superheroes").then(response => {
            setData(response.data);
            setLoading(false);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        })
    }, [setData, setLoading])

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>
            <h2>SuperHeros Page</h2>
            {data.map(superHero => <div key={superHero.id}>{superHero.name}</div>)}
        </>
    )
}