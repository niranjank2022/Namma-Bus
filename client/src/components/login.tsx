import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface FormFields {
    email: string;
    username: string;
    password: string;
    confirm_password?: string;
}

interface LoginBarProps {
    logged: boolean;
    setLogged: (value: boolean | ((prevVal: boolean) => boolean)) => void
}

interface UserResponse {
    message: string;
    token?: string;
}

export default function loginbar(props: LoginBarProps) {

    const navigate = useNavigate();

    const [signupFields, setSignupFields] = useState<FormFields>({
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    });

    const [signinFields, setSigninFields] = useState<FormFields>({
        email: "",
        username: "",
        password: ""
    });

    const handleSigninChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSigninFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleSignupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestBody = { ...signinFields, isAdmin: false };
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });

        if (res.ok) {
            props.setLogged(true)
            alert("Login Successful!");
            navigate("/user/home");
        }
        else {
            alert("Invalid login credentials");
        }
    }

    const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (signupFields.password != signupFields.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        const requestBody = { ...signupFields, isAdmin: false };
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });
        const userRes: UserResponse = await res.json();
        console.log(res, userRes);

        if (res.ok) {
            props.setLogged(true)
            alert(userRes.message);
            navigate("/user/home");
        }
        else {
            alert(userRes.message);
        }
    }

    return (
        <>
            <div className="container pt-5">
                <div className="card-header">
                    <ul className="nav nav-pills nav-justified" role="tablist">
                        <li className="nav-item">
                            <button className="nav-link btn active" role="tab" data-bs-toggle="tab" data-bs-target="#signin" type="button">
                                Sign In
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" role="tab" data-bs-toggle="tab" data-bs-target="#signup" type="button">
                                Sign Up
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane active show fade" id="signin" role="tabpanel">
                            <form onSubmit={handleSigninSubmit}>
                                <div>
                                    <label className="form-label" htmlFor="signin-email">Email</label>
                                    <input className="form-control" id="signin-email" type="email" name="email" onChange={handleSigninChange} value={signinFields["email"]} required />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="signin-username">Username</label>
                                    <input className="form-control" id="signin-username" type="text" name="username" onChange={handleSigninChange} value={signinFields["username"]} required />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="signin-password">Password</label>
                                    <input className="form-control" id="signin-password" type="password" name="password" onChange={handleSigninChange} value={signinFields["password"]} required />
                                </div>
                                <div>
                                    <button className="btn btn-primary">Sign In</button>
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane show fade" id="signup" role="tabpanel">
                            <form onSubmit={handleSignupSubmit}>
                                <div>
                                    <label className="form-label" htmlFor="signup-email">Email</label>
                                    <input className="form-control" id="signup-email" type="email" name="email" onChange={handleSignupChange} value={signupFields["email"]} required />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="signup-username">Username</label>
                                    <input className="form-control" id="signup-username" type="text" name="username" onChange={handleSignupChange} value={signupFields["username"]} required />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="signup-password">Password</label>
                                    <input className="form-control" id="signup-password" type="password" name="password" onChange={handleSignupChange} value={signupFields["password"]} required />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="signup-cpassword">Confirm Password</label>
                                    <input className="form-control" id="signup-cpassword" type="password" name="confirm_password" onChange={handleSignupChange} value={signupFields["confirm_password"]} required />
                                </div>
                                <div>
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}