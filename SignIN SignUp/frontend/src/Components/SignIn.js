import React , { useState } from 'react'
import axios from 'axios';

function SignIn() {

    const [signInData, setSignInData] = useState({});

    const handleChange = (key, value) => {
        setSignInData((prev) => ({ ...prev, [key]: value }))
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3001/signin', signInData);
        if(res){
            console.log(res);
            localStorage.setItem('token',res.data)
        }
       
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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

export default SignIn
