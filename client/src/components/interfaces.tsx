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
}

export interface ISeat {
    _id?: string;
    tag: string;
    assignee?: IBookedUser;
}

export interface ITrip {
    _id: string;
    busId: string;
    departureTime: string;
    departureLocation: string;
    arrivalTime: string;
    arrivalLocation: string;
    travelDuration: number;
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
    handleAdminSignupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAdminSignupSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    adminSigninFields: FormFields;
    adminSignupFields: FormFields;
}

export interface CustomResponse extends Response {
    _id: string;
    message: string;
}