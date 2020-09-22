import React from 'react';

const Nav = () => {
    const [logged,setLogged] = React.useState(true)

    const logout = () => {
       setLogged(!logged)
    }


    return (
        <div>
            <nav className={'navigation'}>
                <ul>
                    <li>Locations</li>
                    <li>Account</li>
                    <li onClick={ () => logout()}>{ logged ? "LogOut" : "LogIn" }</li>
                </ul>
            </nav>

        </div>
    );
}

export default Nav;
