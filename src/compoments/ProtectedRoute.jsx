import React from 'react'
import {Route , Redirect} from 'react-router-dom'

const ProtectedRoute = ({component : Component, isLogged, path, ...rest}) => {
    return (
        <div>
            <Route path={path}>
                {isLogged ? <Component {...rest} /> : <Redirect to='/' /> }
            </Route>
        </div>
    )
}

export default ProtectedRoute