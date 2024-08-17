import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAccess = ({ onDataUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    Date: "",
    Time: "",
    MA: "",
    MB: "",
    MC: "",
    MD: "",
    ME: "",
    MF: "",
    MG: "",
    MH: "",
    MI: "",
    MJ: "",
  });

  const formatTime12Hour = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime12 = formatTime12Hour(now);

      setCurrentTime(formattedTime12); // Set initial time in 12-hour format
      setFormData((prev) => ({ ...prev, Time: formattedTime12 }));
    };

    updateTime(); // Set initial time

    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up the interval
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5003/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to log in");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/api/data", formData);
      alert("Data uploaded successfully");

      // Notify parent component about data update
      if (onDataUpdate) {
        onDataUpdate();
      }

      setFormData({
        Date: "",
        Time: "",
        MA: "",
        MB: "",
        MC: "",
        MD: "",
        ME: "",
        MF: "",
        MG: "",
        MH: "",
        MI: "",
        MJ: "",
      });
    } catch (error) {
      console.error("Data submission failed", error);
      alert("Failed to upload data");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    window.location.reload();
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div className="flex items-center justify-center h-screen">
          <div className="p-8  bg-black rounded-lg shadow-lg flex flex-col gap-5 w-full max-w-sm mx-4">
            <h2 className="text-white text-xl font-semibold">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded-md text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-md text-black"
            />
            <button
              onClick={handleLogin}
              className="p-3 bg-custom-red rounded-md text-white"
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="p-8 bg-black rounded-lg shadow-lg flex flex-col gap-5 w-full max-w-2xl mx-4 mt-[700px]"
          >
            <label className="flex flex-col gap-2 text-white">
              Date:
              <input
                type="date"
                value={formData.Date}
                onChange={(e) =>
                  setFormData({ ...formData, Date: e.target.value })
                }
                className="p-2 border rounded-md text-black"
              />
            </label>
            <label className="flex flex-col gap-2 text-white">
              Time:
              <input
                type="text"
                value={formData.Time || currentTime}
                onChange={(e) =>
                  setFormData({ ...formData, Time: e.target.value })
                }
                className="p-2 border rounded-md text-black"
              />
            </label>
            {["MA", "MB", "MC", "MD", "ME", "MF", "MG", "MH", "MI", "MJ"].map(
              (field) => (
                <label key={field} className="flex flex-col gap-2 text-white">
                  {field}:
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 4) {
                        setFormData({ ...formData, [field]: value });
                      } else if (value.length > 4) {
                        setFormData({
                          ...formData,
                          [field]: value.slice(0, 4),
                        });
                      }
                    }}
                    className="p-2 border rounded-md text-black"
                  />
                </label>
              )
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="p-3 bg-custom-red rounded-md text-white"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="p-3 bg-gray-500 rounded-md text-white"
              >
                Close
              </button>
            </div>
          </form>
          
        </div>
      )}
    </div>
  );
};

export default AdminAccess;
