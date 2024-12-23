import { useState, useEffect } from "react";
import MyTrips from "./myTrips";
import MyProfile from "./myProfile";


interface IUser {
    email: string;
    username: string;
}

export interface TripData {
    tripId: string;
    ticketId: string;
    ticketNo: string;
    createdAt: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDateTime: string;
    arrivalDateTime: string;
    seatTag: string;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<string>("profile");
    const [user, setUser] = useState<IUser>({ email: "", username: "" });
    const [trips, setTrips] = useState<TripData[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const res1 = await fetch("http://localhost:3000/user/profile/", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("JWT")
                }
            });
            if (res1.ok) {
                const res1Data = (await res1.json()) as IUser;
                setUser(() => res1Data);
            }

            const res2 = await fetch("http://localhost:3000/user/trips/booked-tickets/", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("JWT")
                }
            });

            if (res2.ok) {
                const res2Data = (await res2.json()).trips as TripData[];
                setTrips(res2Data);
            }
            else {
                setTrips([]);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Profile</h2>

            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === "trips" ? "active" : ""}`}
                            onClick={() => setActiveTab("trips")}
                        >
                            My Trips
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === "profile" ? "active" : ""}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            My Profile
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="tab-content">
                        {activeTab === "trips" && <MyTrips trips={trips} />}
                        {activeTab === "profile" && <MyProfile user={user} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
