import { useState } from "react";

export default function ReportPage() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    district: "",
    area: "",
    location: "",
    type: "",
    desc: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/complaints",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      alert(
        `Complaint Submitted Successfully!\nComplaint ID: ${data.complaint_id}`
      );

      setForm({
        name: "",
        phone: "",
        district: "",
        area: "",
        location: "",
        type: "",
        desc: "",
      });

    } catch (error) {

      console.error(error);

      alert("Error submitting complaint");

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
        Report Water Leakage
      </h1>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "20px" }}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>District</label>

          <input
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Area</label>

          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Leakage Location</label>

          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            style={textareaStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Leakage Type</label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select</option>

            <option>Pipeline Burst</option>
            <option>Valve Leakage</option>
            <option>Overflow</option>
            <option>Underground Leakage</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Description</label>

          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            required
            style={textareaStyle}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#0B3C5D",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  minHeight: "120px",
};