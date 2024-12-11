export interface User {
    username: string;
    emkail: string;
}

export interface Seat {
    tag: string;
    price: number;
    assignee?: User;
}

export interface Bus {
    _id: string;
    busNo: string;
    busName: string;
    departureTime: string;
    departureLocation: string;
    arrivalTime: string;
    arrivalLocation: string;
    travelDuration: number;
    seats: Seat[];
}

export interface ViewBusResponse {
    buses: Bus[];
    message: string;
}


export interface UserResponse {
    message: string;
    token: string;
    userId: string;
}

export interface AddFormFields {
    busNo: string;
    busName: string;
    departureTime: string;
    departureLocation: string;
    arrivalTime: string,
    arrivalLocation: string;
    travelDuration: number;
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