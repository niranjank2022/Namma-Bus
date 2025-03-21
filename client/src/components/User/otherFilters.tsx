import { useState, useEffect } from "react";
import { SearchData } from "./userSearch";
import { ITrip } from "../interfaces";


interface IProps {
    setFilteredData: React.Dispatch<React.SetStateAction<SearchData[]>>;
    data: SearchData[];
}

export default function OtherFilters(props: IProps) {
    const { setFilteredData, data } = props;
    const [filters, setFilters] = useState({
        departureDateTime_before6: false,
        departureDateTime_6to12: false,
        departureDateTime_12to6: false,
        departureDateTime_after6: false,
        arrivalDateTime_before6: false,
        arrivalDateTime_6to12: false,
        arrivalDateTime_12to6: false,
        arrivalDateTime_after6: false,
        seatsAvailable_eqOne: false,
        seatsAvailable_leFive: false,
        seatsAvailable_gtFive: false,
    });
    const [selectedFilters, setSelectedFilters] = useState<string[][]>([]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const [key1, key2] = name.split("_");

        setFilters((prev) => ({ ...prev, [name]: checked }));

        setSelectedFilters((prevData) => {
            if (checked) {
                return [...prevData, [key1, key2]];
            } else {
                return prevData.filter(filter => !(filter[0] === key1 && filter[1] === key2));
            }
        });
    };

    useEffect(() => {
        let newFilteredData = data;

        selectedFilters.forEach(([key1, key2]) => {
            newFilteredData = newFilteredData.filter((item) => {
                if (key1 === "seatsAvailable") {
                    switch (key2) {
                        case "eqOne":
                            return item[key1] === 1;
                        case "leFive":
                            return item[key1] > 1 && item[key1] <= 5;
                        case "gtFive":
                            return item[key1] > 5;
                        default:
                            return true;
                    }
                } else {
                    const dateTime = item.trip[key1 as keyof ITrip] as string;
                    const tripTime = new Date(dateTime).getTime();
                    const _6AM = new Date(dateTime.slice(0, 11) + "06:00:00.000Z").getTime();
                    const _12PM = new Date(dateTime.slice(0, 11) + "12:00:00.000Z").getTime();
                    const _6PM = new Date(dateTime.slice(0, 11) + "18:00:00.000Z").getTime();

                    switch (key2) {
                        case "before6":
                            return tripTime < _6AM;
                        case "6to12":
                            return tripTime >= _6AM && tripTime <= _12PM;
                        case "12to6":
                            return tripTime > _12PM && tripTime <= _6PM;
                        case "after6":
                            return tripTime > _6PM;
                        default:
                            return true;
                    }
                }
            });
        });

        setFilteredData(newFilteredData);
    }, [selectedFilters]);

    return (
        <>
            <div className="filters-container w-100">
                <div className="row mb-3">
                    <strong>Departure Time</strong>
                    <ul className="list-unstyled">
                        <li>
                            <input
                                type="checkbox"
                                name="departureDateTime_before6"
                                id="departureDateTime_before6"
                                checked={filters.departureDateTime_before6}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="departureDateTime_before6">Before 6 AM</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="departureDateTime_6to12"
                                id="departureDateTime_6to12"
                                checked={filters.departureDateTime_6to12}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="departureDateTime_6to12">6 AM to 12 PM</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="departureDateTime_12to6"
                                id="departureDateTime_12to6"
                                checked={filters.departureDateTime_12to6}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="departureDateTime_12to6">12 PM to 6 PM</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="departureDateTime_after6"
                                id="departureDateTime_after6"
                                checked={filters.departureDateTime_after6}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="departureDateTime_after6">After 6 PM</label>
                        </li>
                    </ul>
                </div>

                <div className="row mb-3">
                    <strong>Arrival Time</strong>
                    <ul className="list-unstyled">
                        <li>
                            <input
                                type="checkbox"
                                name="arrivalDateTime_before6"
                                id="arrivalDateTime_before6"
                                checked={filters.arrivalDateTime_before6}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="arrivalDateTime_before6">Before 6 AM</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="arrivalDateTime_6to12"
                                id="arrivalDateTime_6to12"
                                checked={filters.arrivalDateTime_6to12}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="arrivalDateTime_6to12">6 AM to 12 PM</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="arrivalDateTime_12to6"
                                id="arrivalDateTime_12to6"
                                checked={filters.arrivalDateTime_12to6}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="arrivalDateTime_12to6">12 PM to 6 PM</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="arrivalDateTime_after6"
                                id="arrivalDateTime_after6"
                                checked={filters.arrivalDateTime_after6}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="arrivalDateTime_after6">After 6 PM</label>
                        </li>
                    </ul>
                </div>

                <div className="row mb">
                    <strong>No. of Seats</strong>
                    <ul className="list-unstyled">
                        <li>
                            <input
                                type="checkbox"
                                name="seatsAvailable_eqOne"
                                id="seatsAvailable_eqOne"
                                checked={filters.seatsAvailable_eqOne}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="seatsAvailable_eqOne">1 seat</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="seatsAvailable_leFive"
                                id="seatsAvailable_leFive"
                                checked={filters.seatsAvailable_leFive}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="seatsAvailable_leFive">≤ 5 seats</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                name="seatsAvailable_gtFive"
                                id="seatsAvailable_gtFive"
                                checked={filters.seatsAvailable_gtFive}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="seatsAvailable_gtFive">&gt; 5 seats</label>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
