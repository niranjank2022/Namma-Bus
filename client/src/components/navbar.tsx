import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
    logged: boolean;
    setLogged: (value: boolean | ((prevVal: boolean) => boolean)) => void
}

export default function myHeader(props: HeaderProps): JSX.Element {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-secondary">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand">NAMMA BUS</a>

                    <div className="navbar-collapse collapse navbar-justified">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Contact</a>
                            </li>

                            {props.logged &&
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                        <ul className="dropdown-menu">
                                            <li><a href="#" className="dropdown-item btn" onClick={() => {
                                                props.setLogged(false);
                                                navigate("/");
                                            }}>Logout</a></li>
                                        </ul>
                                    </a>
                                </li>
                            }

                        </ul>
                    </div>

                </div>
            </nav >
        </>
    );
}
