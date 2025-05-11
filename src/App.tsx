import { JSX, useState } from "react"
import { User, UserResponse } from "./types/User"
import './App.css'

function App() {

    const [count, setCount] = useState(0)
    const [users, setUserData] = useState<UserResponse>()

    const [newYorkers, setNewYorkers] = useState<JSX.Element[]>()

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    const getUsers = async() => {
        try {
            const response = await fetch('https://dummyjson.com/users')
            const users = await response.json();
            setUserData(users)
            return users; // Return the fetched data
        } catch (error) {
            console.log("Failed to fetch users: ", error)
            return null;
    }
}

    const getPeopleInNewYork = async() => {
    const userData = await getUsers()
        if (userData) {
            const newYorkUsers = userData.users.filter(
                (user: User) => user.address.city === 'New York'
            ).map((user: User) => (
                <div key={user.id}>
                    {user.firstName}
                </div>
            ))
            setNewYorkers(newYorkUsers)
        }
    }


    return (
        <div className="container">
            <div className="row">
                {`Hello`}
            </div>
            <div>
                <button onClick={incrementCount}>Add Count</button>
            </div>
            <div>
                {count}
            </div>
                <button onClick={getUsers}>Get All Users' city</button>
            <div>
                {
                    users?.users.map((item) => (
                        <div key={item.id}>
                            {item.address.city}
                        </div>
                    ))
                }
            </div>

            <div>
                <button onClick={getPeopleInNewYork}>People living in New York</button>
            </div>   
             <div>
                {newYorkers}
            </div>   
        </div>
    )
}

export default App