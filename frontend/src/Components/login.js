import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom'

const Login = ({ setAuth }) =>{
    
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = { email, password }
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const parsedResponse = await response.json();

            localStorage.setItem('token', parsedResponse.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return(
        <Fragment>
            <h1 className="mt-5 text-center">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    );
}

export default Login;