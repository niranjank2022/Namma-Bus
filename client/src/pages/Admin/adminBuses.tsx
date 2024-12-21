import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IBus, ViewBusResponse } from "./../../components/interfaces";


export default function AdminHome() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<IBus[]>([]);

  const componentLoad = async () => {
    const res = await fetch("http://localhost:3000/admin/buses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("JWT"),
      },
    });
    const resJson: ViewBusResponse = await res.json();
    if (res.ok) {
      setBuses(resJson.buses);
    } else {
      alert(resJson.message);
    }
  };

  useEffect(() => {
    componentLoad();
  }, []);

  return (
    <>
      <div className="container">
        {/* Add Bus button section */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/buses/add-bus")}
          >
            Add Bus
          </button>
        </div>

        {/* Bus Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Bus Name</th>
              <th>Bus No</th>
              <th>Price</th>
              <th>Trips</th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{bus.busName}</td>
                <td>{bus.busNo}</td>
                <td>{bus.price}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate(`/admin/buses/${bus._id}/trips`, {
                        state: { seatsLayout: bus.seatsLayout },
                      })
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
