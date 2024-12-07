export interface LoginBarProps {
    logged: boolean;
    setLogged: (value: boolean | ((prevVal: boolean) => boolean)) => void
}

export interface UserResponse {
    message: string;
    token?: string;
}

export interface FormFields {
    email: string;
    username: string;
    password: string;
    confirm_password?: string;
}

export interface UserLoginProps {
    handleSigninSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSigninChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSignupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSignupSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    signinFields: FormFields;
    signupFields: FormFields;
}

export interface AdminLoginProps {
    handleAdminSigninSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleAdminSigninChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    adminSigninFields: FormFields;
}