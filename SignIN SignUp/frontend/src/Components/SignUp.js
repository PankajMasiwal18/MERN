import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

    const [signUpData, setSignUpData] = useState({});

    const handleChange = (key, value) => {
        setSignUpData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit...");

        axios.post('http://localhost:3001/signup', signUpData)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="name">Name</label>
                <input type="text" name="name" required
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <label for="email">Email</label>
                <input type="email" name="email" required
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                <label for="email">Password</label>
                <input type="password" name="password" required
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>



        </>
    )
}

export default SignUp;