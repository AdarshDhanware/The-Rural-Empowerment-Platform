import { useState } from 'react'
import UserContext from './UserContext'

const ContextProvider = ({ children }) => {
    const [login, setLogin] = useState({
        "phone": null,
        "accessToken": null
    })
    return (
        <UserContext.Provider value={{ login, setLogin }}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextProvider