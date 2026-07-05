import { useEffect, useState } from "react";

export default function AdminPage() {

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/all-complaints"
      );

      const data = await response.json();

      setComplaints(data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateComplaint = async (
    complaintId,
    status,
    priority
  ) => {

    try {

      await fetch(
        `http://127.0.0.1:8000/update-complaint/${complaintId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
            priority,
          }),
        }
      );

      alert("Complaint Updated");

      fetchComplaints();

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1
        style={{
          color: "#0B3C5D",
          marginBottom: "30px",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >

        {complaints.map((item) => (

          <div
            key={item.complaint_id}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >

            <h3>
              {item.complaint_id}
            </h3>

            <p>
              <strong>Name:</strong> {item.name}
            </p>

            <p>
              <strong>District:</strong> {item.district}
            </p>

            <p>
              <strong>Area:</strong> {item.area}
            </p>

            <br />

            <label>Status</label>

            <select
              id={`status-${item.complaint_id}`}
              defaultValue={item.status}
              style={selectStyle}
            >
              <option>Submitted</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <br />
            <br />

            <label>Priority</label>

            <select
              id={`priority-${item.complaint_id}`}
              defaultValue={item.priority}
              style={selectStyle}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Emergency</option>
            </select>

            <br />
            <br />

            <button
              onClick={() =>
                updateComplaint(
                  item.complaint_id,

                  document.getElementById(
                    `status-${item.complaint_id}`
                  ).value,

                  document.getElementById(
                    `priority-${item.complaint_id}`
                  ).value
                )
              }
              style={{
                background: "#0B3C5D",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Update Complaint
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
};  