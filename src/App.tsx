import { useState } from "react"
import { UserResponse } from "./types/User"
import NYUsers from "./components/NyUsers"


function App() {

    const [users, setUsers] = useState<UserResponse>()

    const printToParent = () => {
        console.log('PRINT TO PARENT COMPONENT')
        return 'PRINT TO PARENT COMPONENT'
    }
    const getUsers = async() => {

        try {
            const response = await fetch('https://dummyjson.com/users')
            const users = await response.json()

            setUsers(users);
            return users
        } catch(err) {
            console.log('Error fetching data', err)
        }
        
    }
    return (
        <div className="container">
            <div className="row">
                <button onClick={getUsers}>Show Users</button>
            </div>
            <div className="row">
                {
                    users?.users.map((user) => (
                        <div key={user.id}>
                            {user.firstName}
                        </div>
                    ))
                }
            </div>

            <NYUsers getUsers={getUsers} printToParent={printToParent}/>
        </div>
    )

}

export default App