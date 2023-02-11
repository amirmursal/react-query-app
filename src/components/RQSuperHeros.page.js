
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHerosData, useAddSuperHeroData } from "../hooks/userSuperHerosData";

export const RQSuperHeroesPage = () => {
    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');

    const onSuccess = (data) => {
        console.log("perform side effect after data fetching", data)
    }

    const onError = (error) => {
        console.log("perform side effect after encountering error", error)
    }


    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHerosData(onSuccess, onError);

    const { mutate: addHero } = useAddSuperHeroData();

    const handleAddHero = () => {
        const hero = { name, alterEgo };
        addHero(hero);
    }


    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return <>
        <h2>RQSuperHeros Page</h2>
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                value={alterEgo}
                onChange={(e) => setAlterEgo(e.target.value)}
            />
            <button onClick={handleAddHero}>Add Hero</button>
        </div>
        <button onClick={refetch}>Fetch Heros</button>
        {
            data?.data.map((hero) => {
                return <div key={hero.id}>
                    <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
                </div>
            })
        }
    </>
}