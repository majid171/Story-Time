import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import styles from '../Styles/login.module.css';
import Header from './header';
import * as Constants from '../constants';

const textFieldStyle = {
    width: '70%',
    marginBottom: 10,
}

const Login = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("");

    const validateForm = () =>{
        return email !== "" && password !== "";
    }

    const clearPassword = () =>{
        setPassword("");
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const url = Constants.backendURL + '/auth/login'
            const body = { email, password }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body),
            });
            const parsedResponse = await response.json();
            if (response.status === 200) {
                setAuth(true);
            }
            else {
                setShowAlert(true);
                setError(parsedResponse);
                clearPassword();
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
                <form className={styles.formContainer} onSubmit={onSubmitForm} autoComplete={true}>
                    <p className={styles.formTitle}>StoryTime</p>
                    <p className={styles.welcome}>Welcome Back!</p>
                    <TextField
                        required
                        label="Email"
                        id="Email"
                        variant="outlined"
                        style={textFieldStyle}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        label="Password"
                        id="Password"
                        type="password"
                        variant="outlined"
                        style={textFieldStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.error} className={!showAlert? styles.hiddenAlert : styles.visibleAlert}>
                        {error}
                    </div>
                    <a href="#" className={styles.forgot}>Forgot Password?</a>
                    <span className={styles.registerText}>
                        Don't have an account?
                        <a href={Constants.frontendURL + '/register'} > Sign Up</a>
                    </span>    
                    <hr></hr>
                    <button disabled={!validateForm()} className={styles.loginButton}>Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;