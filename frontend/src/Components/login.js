import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import styles from '../Styles/login.module.css';
import Header from './header';

const textFieldStyle = {
    width: '70%',
    marginBottom: 10,
}

const Login = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () =>{
        return email !== "" && password !== "";
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = { email, password }
            console.log(body);
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const parsedResponse = await response.json();

            if (parsedResponse.token) {
                localStorage.setItem('token', parsedResponse.token);
                setAuth(true);
            }
            else {
                console.log('nope')
                setAuth(false);
            }


        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <Header></Header>
            </div>
            <div className={styles.outerContainer}>
                <form className={styles.formContainer} onSubmit={onSubmitForm}>
                    <p className={styles.formTitle}>StoryTime</p>
                    <p className={styles.welcome}>Welcome Back!</p>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        variant="outlined"
                        style={textFieldStyle}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        type="password"
                        variant="outlined"
                        style={textFieldStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="#" className={styles.forgot}>Forgot Password?</a>
                    <span className={styles.registerText}>
                        Don't have an account?
                        <a href="http://localhost:3000/register" > Sign Up</a>
                    </span>
                    
                    <hr></hr>
                    <button disabled={!validateForm()} className={styles.loginButton}>Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
