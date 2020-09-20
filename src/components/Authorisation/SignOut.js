import React from 'react'
import {logOut} from '../../firebase'



const LogOut = () => {
    return (
        <div>
            <button onClick = {() => logOut()}>Logout</button>
        </div>
    )
}

export default LogOut