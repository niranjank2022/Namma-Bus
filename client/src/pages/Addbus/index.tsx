import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Trips from "./trips";
import BusLayout from "./busLayout";

export interface TripsItem {
    id: number;
    departureLocation: string;
    arrivalLocation: string;
    departureTime: string;
    arrivalTime: string;
    travelDuration: number;
}

export default function AddBus() {
    const navigate = useNavigate();
    const [step, setstep] = useState(1);

    const [formData, setFormData] = useState({
        busName: "",
        busNo: "",
        busType: "",
    });
    const [trips, setTrips] = useState<TripsItem[]>([]);

    const [topLeft, setTopLeft] = useState<{ row: number, col: number }>({ row: 1, col: 1 });
    const [topRight, setTopRight] = useState<{ row: number, col: number }>({ row: 1, col: 1 });
    const [bottom, setBottom] = useState<{ row: number, col: number }>({ row: 1, col: 1 });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => { return { ...prevState, [event.target.name]: Number(event.target.value) } });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // setBusFields(prevState => { return { ...prevState, seats: seats } });

        // const res = await fetch("http://localhost:3000/admin/buses/", {
        //     method: "GET",
        //     headers: {
        //         "Authorization": "Bearer " + sessionStorage.getItem("JWT")
        //     },
        //     body: JSON.stringify(busFields)
        // });
        navigate("/admin/home");
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
                                <label className="formLabel" htmlFor="busName">Bus Type</label>
                                <input className="formControl" type="text" id="busType" name="busType" value={formData.busType} onChange={handleChange} required />
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