import { useState } from "react";

export default function TrackPage() {

  const [complaintId, setComplaintId] = useState("");

  const [complaint, setComplaint] = useState(null);

  const [loading, setLoading] = useState(false);

  const trackComplaint = async () => {

    if (!complaintId) {
      alert("Please enter complaint ID");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/complaints/${complaintId}`
      );

      const data = await response.json();

      if (data.error) {

        alert("Complaint not found");

        setComplaint(null);

      } else {

        setComplaint(data);

      }

    } catch (error) {

      console.error(error);

      alert("Server error");

    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "white",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >

      <h1
        style={{
          marginBottom: "30px",
          color: "#0B3C5D",
        }}
      >
        Track Complaint
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <input
          type="text"
          placeholder="Enter Complaint ID"
          value={complaintId}
          onChange={(e) =>
            setComplaintId(e.target.value)
          }
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={trackComplaint}
          style={{
            background: "#0B3C5D",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Tracking..." : "Track"}
        </button>

      </div>

      {complaint && (

        <div
          style={{
            background: "#f4f6f9",
            padding: "30px",
            borderRadius: "12px",
          }}
        >

          <h2 style={{ marginBottom: "20px" }}>
            Complaint Details
          </h2>

          <p>
            <strong>Complaint ID:</strong>{" "}
            {complaint.complaint_id}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {complaint.name}
          </p>

          <p>
            <strong>District:</strong>{" "}
            {complaint.district}
          </p>

          <p>
            <strong>Area:</strong>{" "}
            {complaint.area}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {complaint.location}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {complaint.description}
          </p>

          <p>
            <strong>Status:</strong>{" "}

            <span
              style={{
                background: "#FFD166",
                padding: "6px 12px",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              {complaint.status}
            </span>

          </p>

          <p>
            <strong>Priority:</strong>{" "}
            {complaint.priority}
          </p>

        </div>
      )}

    </div>
  );
}