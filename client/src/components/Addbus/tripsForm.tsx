import { useState } from "react";

export interface TripsItem {
    id: number;
    departureLocation: string;
    departureTime: string;
    departureDate: string;
    arrivalLocation: string;
    arrivalTime: string;
    arrivalDate: string;
}

interface TripsProps {
    trips: TripsItem[];
    setTrips: React.Dispatch<React.SetStateAction<TripsItem[]>>;
    prevStep: () => void;
    nextStep: () => void;
}

export default function Trips(props: TripsProps) {
    const { trips, setTrips, prevStep, nextStep } = props;
    const [currentItem, setCurrentItem] = useState<TripsItem>({
        id: 0,
        departureLocation: "",
        departureTime: "",
        departureDate: "",
        arrivalLocation: "",
        arrivalTime: "",
        arrivalDate: "",
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentItem((prev) => ({
            ...prev,
            [name]: name === "travelDuration" ? Number(value) : value,
        }));
    };

    const handleSaveItem = () => {
        if (editingIndex !== null) {
            setTrips((prev) =>
                prev.map((item, index) =>
                    index === editingIndex ? { ...currentItem, id: item.id } : item
                )
            );
            setEditingIndex(null);
        } else {
            setTrips((prev) => [...prev, { ...currentItem, id: Date.now() }]);
        }

        setCurrentItem({
            id: 0,
            departureLocation: "",
            departureDate: "",
            departureTime: "",
            arrivalLocation: "",
            arrivalDate: "",
            arrivalTime: "",
        });
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setCurrentItem(trips[index]);
    };

    const handleDelete = (index: number) => {
        setTrips((prev) => prev.filter((_, i) => i !== index));
        if (expandedIndex === index) setExpandedIndex(null); // Close dropdown if deleted
    };

    const toggleDropdown = (index: number) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="container mt-4">
            <h3>Trip Details</h3> <hr />

            {/* Form to add/edit trips */}
            <div className="mb-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Departure Details</h5>
                        <input
                            type="text"
                            name="departureLocation"
                            placeholder="Enter Departure Location"
                            value={currentItem.departureLocation}
                            onChange={handleInputChange}
                            className="form-control mb-2"
                        />
                        <label htmlFor="departureDate">Select Departure Date</label>
                        <input
                            type="date"
                            id="departureDate"
                            name="departureDate"
                            placeholder="Enter Departure Date"
                            value={currentItem.departureDate}
                            onChange={handleInputChange}
                            className="form-control mb-2"
                        />
                        <label htmlFor="departureTime">Select Departure Time</label>
                        <input
                            type="time"
                            id="departureTime"
                            name="departureTime"
                            placeholder="Enter Departure Time"
                            value={currentItem.departureTime}
                            onChange={handleInputChange}
                            className="form-control mb-2"
                        />
                    </div>

                    <div className="col-md-6">
                        <h5>Arrival Details</h5>
                        <input
                            type="text"
                            name="arrivalLocation"
                            placeholder="Enter Arrival Location"
                            value={currentItem.arrivalLocation}
                            onChange={handleInputChange}
                            className="form-control mb-2"
                        />
                        <label htmlFor="arrivalDate">Select Arrival Date</label>
                        <input
                            type="date"
                            id="arrivalDate"
                            name="arrivalDate"
                            placeholder="Enter Arrival Date"
                            value={currentItem.arrivalDate}
                            onChange={handleInputChange}
                            className="form-control mb-2"
                        />
                        <label htmlFor="arrivalTime">Select Arrival Time</label>
                        <input
                            type="time"
                            id="arrivalTime"
                            name="arrivalTime"
                            placeholder="Enter Arrival Time"
                            value={currentItem.arrivalTime}
                            onChange={handleInputChange}
                            className="form-control mb-2"
                        />
                    </div>
                </div>

                <button onClick={handleSaveItem} className="btn btn-primary mt-3">
                    {editingIndex !== null ? "Update Item" : "Add Item"}
                </button>
            </div>

            {trips.length > 0 && (
                <div>
                    <h4>Trips Added</h4>
                    <ul className="list-group">
                        {trips.map((item, index) => (
                            <li key={item.id} className="list-group-item">
                                {/* Title as clickable dropdown */}
                                <div
                                    className="d-flex justify-content-between align-items-center"
                                    onClick={() => toggleDropdown(index)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <strong>{`${item.departureLocation} to ${item.arrivalLocation}`}</strong>
                                    <span>{expandedIndex === index ? "▲" : "▼"}</span>
                                </div>

                                {/* Expandable content */}
                                {expandedIndex === index && (
                                    <div className="mt-2">
                                        <div className="row">
                                            {/* Departure Details */}
                                            <div className="col-md-6">
                                                <p>
                                                    <strong>Departure Date:</strong> {item.departureDate}
                                                </p>
                                                <p>
                                                    <strong>Departure Time:</strong> {item.departureTime}
                                                </p>
                                            </div>
                                            {/* Arrival Details */}
                                            <div className="col-md-6">
                                                <p>
                                                    <strong>Arrival Date:</strong> {item.arrivalDate}
                                                </p>
                                                <p>
                                                    <strong>Arrival Time:</strong> {item.arrivalTime}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-2">
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-3">
                <button onClick={prevStep} className="btn btn-secondary me-2">
                    Previous
                </button>
                <button onClick={nextStep} className="btn btn-primary">
                    Next
                </button>
            </div>
        </div>
    );
}
