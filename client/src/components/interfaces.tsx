export interface ISeatsLayout {
    topLeftRow: number,
    topLeftCol: number,
    topRightRow: number,
    topRightCol: number,
    bottomRow: number,
    bottomCol: number,
}

export interface IBus {
    _id: string;
    busNo: string;
    busName: string;
    price: number;
    tagSeries: string;
    seatsLayout: ISeatsLayout;
    trips: string[];
}

export interface IBookedUser {
    username: string;
    email: string;
    tickedTd: string;
}

export interface ISeat {
    _id?: string;
    tag: string;
    assignee?: IBookedUser | null;
}

export interface ITrip {
    _id: string;
    busId: string;
    departureDateTime: string;
    departureLocation: string;
    arrivalDateTime: string;
    arrivalLocation: string;
    seats: ISeat[];
}

export interface ViewBusResponse extends Response {
    buses: IBus[];
    message: string;
}

export interface ViewTripsResponse extends Response {
    trips: ITrip[];
    message: string;
}

export interface UserResponse extends Response {
    message: string;
    token: string;
    userId: string;
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
    handleAdminSignupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAdminSignupSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    adminSigninFields: FormFields;
    adminSignupFields: FormFields;
}

export interface CustomResponse extends Response {
    _id: string;
    message: string;
}