import axios from "axios"
import { useQuery } from "react-query";

export const DependentQueriesPage = ({ email }) => {

    const fetchUserByEmail = email => axios.get(`http://localhost:4000/users/${email}`);
    const { data: user } = useQuery(["user", email], () => fetchUserByEmail(email));
    const channelId = user?.data.channelId;

    const fetchCoursesByChannelId = channelId => axios.get(`http://localhost:4000/channels/${channelId}`);

    const { data: courses } = useQuery(["channels", channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId
    })

    return (
        <div>
            {courses?.data.courses.map(course => <div key={course}>{course}</div>)}
        </div>
    )
}