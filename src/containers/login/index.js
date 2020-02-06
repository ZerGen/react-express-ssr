import React from 'react'
import Header from '../../components/header';

const Login = () => {
    return (
        <div>
            <Header />
            <div>Login</div>
            <button onClick={() => console.log('login')}>Login button</button>
        </div>
    )
}

export default Login