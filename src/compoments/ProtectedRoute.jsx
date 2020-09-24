import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({
  component: Component,
  isLogged,
  path,
  ...rest
}) => {
  return (
    <div>
      <Route
        path={path}
        render={props =>
          isLogged ? <Component {...rest} {...props} isLogged={isLogged} /> : <Redirect to={'/login'} />
        }
      />
    </div>
  )
}

export default ProtectedRoute
