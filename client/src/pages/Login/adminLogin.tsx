import { AdminLoginProps } from "./interfaces";


export default function adminLogin(props: AdminLoginProps) {

    const { handleAdminSigninSubmit, handleAdminSigninChange, adminSigninFields } = props;

    return (
        <>

            <div className="card-header">
                <span>Admin - Sign In</span>
            </div>
            <div className="card-body">
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

        </>
    );
}