import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Trips from "./tripsForm";
import BusLayout from "./seatsLayoutForm";
import { TripsItem } from "./tripsForm";


export default function AddBus() {
    const navigate = useNavigate();
    const [step, setstep] = useState(1);

    const [formData, setFormData] = useState<{ busName: string, busNo: string, price: number, tagSeries: string }>({
        busName: "",
        busNo: "",
        price: 0,
        tagSeries: ""
    });
    const [trips, setTrips] = useState<TripsItem[]>([]);

    const [topLeft, setTopLeft] = useState<{ row: number, col: number }>({ row: 1, col: 1 });
    const [topRight, setTopRight] = useState<{ row: number, col: number }>({ row: 1, col: 1 });
    const [bottom, setBottom] = useState<{ row: number, col: number }>({ row: 1, col: 1 });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => { return { ...prevState, [event.target.name]: event.target.value } });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Adding the bus data
        const res1 = await fetch("http://localhost:3000/admin/buses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("JWT")}`
            },
            body: JSON.stringify({
                ...formData,
                seatsLayout: {
                    topLeftRow: topLeft.row,
                    topLeftCol: topLeft.col,
                    topRightRow: topRight.row,
                    topRightCol: topRight.col,
                    bottomRow: bottom.row,
                    bottomCol: bottom.col
                },
            })
        });

        if (!res1.ok) {
            console.log("HI", await res1.json())
            return;
        }

        const res1Obj = await res1.json();
        const busId = res1Obj._id;

        // Adding the trips data
        for (const trip of trips) {
            var res2 = await fetch(`http://localhost:3000/admin/buses/${busId}/trips`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("JWT")}`
                },
                body: JSON.stringify({
                    busId,
                    departureLocation: trip.departureLocation,
                    arrivalLocation: trip.arrivalLocation,
                    departureDateTime: `${trip.departureDate}T${trip.departureTime}:00`,
                    arrivalDateTime: `${trip.arrivalDate}T${trip.arrivalTime}:00`
                })
            });
            if (!res2.ok) {
                console.log(trip, " not added. Error occurred.", res1Obj);
                return;
            }
        }

        navigate("/admin/buses");
    };

    const nextStep = () => {
        setstep(step + 1);
    };

    const prevStep = () => {
        setstep(step - 1);
    };

    switch (step) {
        case 1:
            return (
                <>
                    <div className="card">

                        <div className="card-header">
                            <div>
                                <h3>Bus Details</h3>
                            </div>
                        </div>

                        <div className="card-body">
                            <div>
                                <label className="formLabel" htmlFor="busNo">Bus Number </label>
                                <input className="formControl" type="text" id="busNo" name="busNo" value={formData.busNo} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="formLabel" htmlFor="busName">Bus Name</label>
                                <input className="formControl" type="text" id="busName" name="busName" value={formData.busName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="formLabel" htmlFor="busName">Ticket Price</label>
                                <input className="formControl" type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="formLabel" htmlFor="busName">Ticket Tag Series</label>
                                <input className="formControl" type="text" id="tagSeries" name="tagSeries" value={formData.tagSeries} onChange={handleChange} required />
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <button className="btn btn-primary" onClick={nextStep}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );

        case 2:
            return (
                <>
                    <BusLayout
                        topLeft={topLeft}
                        topRight={topRight}
                        bottom={bottom}
                        setTopLeft={setTopLeft}
                        setTopRight={setTopRight}
                        setBottom={setBottom}
                        prevStep={prevStep}
                        nextStep={nextStep} />
                </>
            );

        case 3:
            return (
                <>
                    <Trips trips={trips} setTrips={setTrips} prevStep={prevStep} nextStep={nextStep} />
                </>
            );

        default:
            return (
                <>
                    <span>You are going to add a bus!</span>
                    <div className="mt-3">
                        <button onClick={prevStep} className="btn btn-secondary me-2">
                            Previous
                        </button>
                        <button onClick={handleSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </>
            );
    }
}