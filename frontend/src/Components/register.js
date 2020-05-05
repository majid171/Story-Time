import React, { Fragment, useState } from 'react';
import { TextField } from '@material-ui/core/';
import styles from '../Styles/register.module.css';
import Header from './header';

const textFieldStyle = {
    width: '80%',
    margin: 5,
}

const nameTextFieldStyle = {
    margin: 5,
}

const Register = ({ setAuth }) => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("");

    const validateForm = () => {
        return email !== "" && password !== ""
            && first_name !== "" && last_name !== "";
    }

    const clearForm = () =>{
        setPassword("");
        setEmail("");
        setFirstName("");
        setLastName("");
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        
        try {
            const body = { first_name, last_name, email, password }
            // console.log(body)
            const response = await fetch('http://localhost:5000/auth/register', {
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
                setShowAlert(true);
                setError(parsedResponse);
                clearForm();
                setAuth(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className={styles.container}>
            <div><Header></Header></div>
            <div className={styles.outerContainer}>
                <form className={styles.formContainer} onSubmit={onSubmitForm}>
                    <p className={styles.formTitle}>StoryTime</p>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            variant="outlined"
                            style={nameTextFieldStyle}
                            value={first_name}
                            onChange={e => setFirstName(e.target.value)}
                            
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            variant="outlined"
                            style={nameTextFieldStyle}
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
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
                    <div className={styles.error} className={!showAlert? styles.hiddenAlert : styles.visibleAlert}>
                        {error}
                    </div>
                    <span>
                        Already have an account?
                        <a href="http://localhost:3000/login"> Log In</a>
                    </span>
                    <button disabled={!validateForm()} className={styles.signUpButton}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;