import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ isLogged, setIsLogged }) => {
  return (
    <div>
      <nav className={'navigation'}>
        <ul>
          <li>
            <Link to={'/'}>Locations</Link>
          </li>
          <li>
            <Link to={'/account'}>Account</Link>
          </li>
          <li>
            {isLogged ? (
              <Link to={'/'} onClick={() => setIsLogged(false)}>
                {' '}
                Log out{' '}
              </Link>
            ) : (
              <Link to={'/login'}> Log in </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
