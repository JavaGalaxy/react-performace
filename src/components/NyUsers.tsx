import { JSX, useState } from "react"
import { UserResponse } from "../types/User";

interface NYUsersProps {
    getUsers: () => Promise<UserResponse>;
    printToParent: () => string;
}

const NYUsers = ({ getUsers, printToParent }: NYUsersProps): JSX.Element => {

    const [nyUsers, setNYUsers] = useState<UserResponse['users']>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getNYusers = async() => {

        setIsLoading(true);
        try {
            const allUsers: UserResponse = await getUsers()
            const filteredUsers = allUsers.users.filter((user) => user.address.city === 'New York');
            setNYUsers(filteredUsers)

        } catch(error){
            console.error("Failed to fetch users: ", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="container">
            <div>
                <button onClick={getNYusers} aria-label="Filter for New York users">
                    NY users only
                </button>
            </div>
            <div>
                {
                    isLoading? (
                        <p>Loading users....</p>
                    ):(
                        nyUsers.map((user) => (
                            <div key={user.id}>
                                {user.firstName}
                            </div>
                        ))
                    )
                }
            </div>
            <div>
            <div>
                <button onClick={printToParent}>Print in Parent Component</button>
            </div>
            </div>
        </section>
    )
}

export default NYUsers