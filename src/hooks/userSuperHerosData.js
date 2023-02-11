import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios.utils"

const fetchSuperHeros = () => request({ url: '/superheroes' }); //axios.get("http://localhost:4000/superheroes");
const addSuperHero = (hero) => request({ url: '/superheroes', method: 'post', data: hero }); //axios.post("http://localhost:4000/superheroes", hero);

export const useSuperHerosData = (onSuccess, onError) => {
    return useQuery(
        "super-heros",
        fetchSuperHeros,
        {
            onError,
            onSuccess
        }
    );
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     })

        // }
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heros');
            const previousHeroData = queryClient.getQueryData('super-heroes');
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData?.data,
                        { id: oldQueryData?.data?.length + 1, ...newHero }
                    ]
                }
            })
            return {
                previousHeroData,
            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes');
        }
    })
}