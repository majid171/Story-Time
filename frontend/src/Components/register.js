import React, { Fragment, useState } from 'react';
import { TextField } from '@material-ui/core/';
import { toast } from 'react-toastify';
import styles from '../Styles/register.module.css';
import Header from './header';

const textFieldStyle = {
    width: '80%',
    margin: 5,
}

const nameTextFieldStyle = {
    // width: '70%',
    margin: 5,
}

const Register = ({ setAuth }) => {

    const [firstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return email !== "" && password !== ""
            && firstName !== "" && LastName !== "";
    }


    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            // const body = { first_name, last_name, email, password }
            // const response = await fetch('http://localhost:5000/auth/register', {
            //     method: 'POST',
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify(body)
            // });
            // const parsedResponse = await response.json();

            // if (parsedResponse.token) {
            //     localStorage.setItem('token', parsedResponse.token);
            //     setAuth(true);
            // }
            // else {
            //     setAuth(false);
            // }
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
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            variant="outlined"
                            style={nameTextFieldStyle}
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            variant="outlined"
                            style={textFieldStyle}
                            // value={email}
                            // onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            type="password"
                            variant="outlined"
                            style={textFieldStyle}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;