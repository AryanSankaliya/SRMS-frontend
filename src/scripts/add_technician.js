const axios = require("axios");

const API_URL = "http://localhost:5000";

const newTechnician = {
    firstName: "Suresh",
    lastName: "Tech",
    email: "suresh.tech@example.com",
    password: "password123",
    enrollmentNo: "TECH002",
    mobile: "9876543210",
    role: "Technician",
    department: "IT"
};

async function addTechnician() {
    try {
        console.log("Registering new technician...");
        const response = await axios.post(`${API_URL}/user/register`, newTechnician);

        if (response.status === 201) {
            console.log("✅ Technician Added Successfully!");
            console.log("Name:", response.data.firstName, response.data.lastName);
            console.log("Email:", response.data.email);
            console.log("Role:", response.data.role);
        } else {
            console.log("⚠️ Unexpected status:", response.status);
        }
    } catch (error) {
        if (error.response) {
            console.error("❌ Registration Failed:", error.response.data);
        } else {
            console.error("❌ Error:", error.message);
        }
    }
}

addTechnician();
