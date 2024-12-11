import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormFields, UserResponse } from "./interfaces";
import UserLogin from "./userLogin";
import AdminLogin from "./adminLogin";

export default function Login() {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

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

    const [adminSigninFields, setAdminSigninFields] = useState<FormFields>({
        email: "",
        username: "",
        password: ""
    });

    const handleAdminSigninChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminSigninFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleAdminSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestBody = { ...adminSigninFields, isAdmin };
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
            navigate("/admin/home");
        }
        else {
            alert(userRes.message);
        }
    }

    const handleSigninChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSigninFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleSignupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupFields(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    }

    const handleSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestBody = { ...signinFields, isAdmin };
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
            navigate("/user/home");
        }
        else {
            alert(userRes.message);
        }
    }

    const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (signupFields.password != signupFields.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        const requestBody = { ...signupFields, isAdmin };
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
            navigate("/user/home");
        }
        else {
            alert(userRes.message);
        }
    }

    return (
        <>
            <div className="container pt-5">


                <div className="container-fluid">
                    {isAdmin ? (<AdminLogin
                        handleAdminSigninSubmit={handleAdminSigninSubmit}
                        handleAdminSigninChange={handleAdminSigninChange}
                        adminSigninFields={adminSigninFields}
                    />) :
                        (<UserLogin
                            handleSigninSubmit={handleSigninSubmit}
                            handleSigninChange={handleSigninChange}
                            handleSignupChange={handleSignupChange}
                            handleSignupSubmit={handleSignupSubmit}
                            signinFields={signinFields}
                            signupFields={signupFields}
                        />)}
                    <div>
                        <span>
                            <a href="#" onClick={() => setIsAdmin(!isAdmin)}>
                                Continue as {!isAdmin ? "Admin" : "User"}?
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}