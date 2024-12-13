import { AdminLoginProps } from "./../../components/interfaces";


export default function adminLogin(props: AdminLoginProps) {

    const { handleAdminSigninSubmit, handleAdminSigninChange, handleAdminSignupChange, handleAdminSignupSubmit, adminSigninFields, adminSignupFields } = props;
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
        </>
    );
}