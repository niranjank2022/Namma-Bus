import { UserLoginProps } from "./interfaces";


export default function userLogin(props: UserLoginProps) {

    const { handleSigninSubmit, handleSigninChange, handleSignupChange, handleSignupSubmit, signinFields, signupFields } = props;

    return (

        <>
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
        </>

    );
}