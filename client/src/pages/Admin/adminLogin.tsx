import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormFields, UserResponse } from "../../components/interfaces";

export default function Login() {

    const navigate = useNavigate();

    const [adminSigninFields, setAdminSigninFields] = useState<FormFields>({
        email: "",
        username: "",
        password: ""
    });

    const [adminSignupFields, setAdminSignupFields] = useState<FormFields>({
        email: "",
        username: "",
        password: ""
    });

    const handleAdminSigninChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminSigninFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleAdminSignupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminSignupFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleAdminSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestBody = { ...adminSigninFields, isAdmin: true };
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });
        const userRes: UserResponse = await res.json();

        if (res.ok) {
            sessionStorage.setItem("logged", "true");
            sessionStorage.setItem("JWT", userRes.token);
            sessionStorage.setItem("userId", userRes.userId);
            alert(userRes.message);
            navigate("/admin/buses");
        }
        else {
            alert(userRes.message);
        }
    }

    const handleAdminSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (adminSignupFields.password != adminSignupFields.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        const requestBody = { ...adminSignupFields };
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });
        const userRes: UserResponse = await res.json();

        if (res.ok) {
            sessionStorage.setItem("logged", "true");
            sessionStorage.setItem("JWT", userRes.token);
            sessionStorage.setItem("userId", userRes.userId);
            alert(userRes.message);
            navigate("/admin/buses");
        }
        else {
            alert(userRes.message);
        }
    }

    return (
        <>
            <div className="container pt-5">
                <div className="container-fluid">
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
                            <h3>Admin - Login</h3>
                            <div className="tab-pane active show fade" id="signin" role="tabpanel">
                                <form onSubmit={handleAdminSigninSubmit}>
                                    <div>
                                        <label className="form-label" htmlFor="signin-email">Email</label>
                                        <input className="form-control" id="signin-email" type="email" name="email" onChange={handleAdminSigninChange} value={adminSigninFields["email"]} required />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="signin-username">Username</label>
                                        <input className="form-control" id="signin-username" type="text" name="username" onChange={handleAdminSigninChange} value={adminSigninFields["username"]} required />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="signin-password">Password</label>
                                        <input className="form-control" id="signin-password" type="password" name="password" onChange={handleAdminSigninChange} value={adminSigninFields["password"]} required />
                                    </div>
                                    <div>
                                        <button className="btn btn-primary">Sign In</button>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane show fade" id="signup" role="tabpanel">
                                <form onSubmit={handleAdminSignupSubmit}>
                                    <div>
                                        <label className="form-label" htmlFor="signup-email">Email</label>
                                        <input className="form-control" id="signup-email" type="email" name="email" onChange={handleAdminSignupChange} value={adminSignupFields["email"]} required />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="signup-username">Username</label>
                                        <input className="form-control" id="signup-username" type="text" name="username" onChange={handleAdminSignupChange} value={adminSignupFields["username"]} required />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="signup-password">Password</label>
                                        <input className="form-control" id="signup-password" type="password" name="password" onChange={handleAdminSignupChange} value={adminSignupFields["password"]} required />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="signup-cpassword">Confirm Password</label>
                                        <input className="form-control" id="signup-cpassword" type="password" name="confirm_password" onChange={handleAdminSignupChange} value={adminSignupFields["confirm_password"]} required />
                                    </div>
                                    <div>
                                        <button className="btn btn-primary">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}