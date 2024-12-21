import { useState } from "react";

interface TripsItem {
    id: number;
    departureLocation: string;
    departureTime: string;
    arrivalLocation: string;
    arrivalTime: string;
    travelDuration: number;
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
        arrivalLocation: "",
        arrivalTime: "",
        travelDuration: 0,
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
            departureTime: "0",
            arrivalLocation: "",
            arrivalTime: "",
            travelDuration: 0,
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
            <h3>Trip Details</h3>

            {/* Form to add/edit trips */}
            <div className="mb-3">
                <input
                    type="text"
                    name="departureLocation"
                    placeholder="Enter Departure Location"
                    value={currentItem.departureLocation}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                <input
                    type="time"
                    name="departureTime"
                    placeholder="Enter Departure Time"
                    value={currentItem.departureTime}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="arrivalLocation"
                    placeholder="Enter Arrival Location"
                    value={currentItem.arrivalLocation}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                <input
                    type="date"
                    name="arrivalTime"
                    placeholder="Enter Arrival Time"
                    value={currentItem.arrivalTime}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    name="travelDuration"
                    placeholder="Enter Travel Duration"
                    value={currentItem.travelDuration}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                <button onClick={handleSaveItem} className="btn btn-primary">
                    {editingIndex !== null ? "Update Item" : "Add Item"}
                </button>
            </div>

            {/* Dropdown to view/edit trips */}
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
                                        <p>
                                            <strong>Departure Time:</strong>{" "}
                                            {item.departureTime}
                                        </p>
                                        <p>
                                            <strong>Arrival Time:</strong>{" "}
                                            {item.arrivalTime}
                                        </p>
                                        <p>
                                            <strong>Travel Duration:</strong>{" "}
                                            {item.travelDuration} hours
                                        </p>
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
