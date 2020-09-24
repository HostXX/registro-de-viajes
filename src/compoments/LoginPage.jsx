import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const LoginPage = ({ isLogged, setIsLogged }) => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const onSubmit = async data => {
    console.log(data)
    // setError on an error
  }

  return (
    <div className={'account-page'}>
      {isLogged ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}

      <p>Login Page</p>

      <div className='loggin-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
          {error ? <h3 className='error'>{error}</h3> : null}
          <label htmlFor='username'>Username or Email</label>
          <input name='username' required ref={register} id='username' />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            required
            ref={register}
            id='password'
          />
          <br />
          <br />
          <br />
          <button type='submit'>Login with database</button>
          <button onClick={() => setIsLogged(true)}>Login test</button>
        </form>

        <button >Register</button>
      </div>
    </div>
  )
}

export default LoginPage
