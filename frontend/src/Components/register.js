import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { Link, Router } from 'react-router-dom';

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { first_name, last_name, email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = { first_name, last_name, email, password }
            const response = await fetch('http://localhost:5000/auth/register', {
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

    return (
        <Fragment>
            <h1 className="mt-5 text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    placeholder="First Name"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    placeholder="Last Name"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
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
        </Fragment>
    );
}

export default Register;