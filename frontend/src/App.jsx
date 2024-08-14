import { useState, useEffect } from "react";
import axios from "axios";
import AdminAccess from "./admin/AdminAccess";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resultText, setResultText] = useState("");
  const [data, setData] = useState([]);
  const [showAdminAccess, setShowAdminAccess] = useState(false);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  

  useEffect(() => {
    if (startDate && endDate) {
      setResultText(`From: ${startDate} To: ${endDate}`);
    } else if (startDate) {
      setResultText(`For Date: ${startDate}`);
    } else {
      setResultText("Result of Today");
    }
  }, [startDate, endDate]);

  const reverseDate = (dateStr) => {
    // Assuming dateStr is in "dd-mm-yyyy" format
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };
  

  
  const handleSearch = async () => {
    try {
      const response = await axios.get("https://areen.onrender.com/api/items", {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });
      console.log("API Response Data:", response.data); // Inspect the data
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  };
  
  
  
  const formDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const generateTodayRows = () => {
    const today = new Date();
    const timeSlots = [];
  
    // Generate time slots from 9:00 A.M. to 9:00 P.M.
    for (let hour = 9; hour <= 21; hour++) {
      const period = hour < 12 ? 'A.M.' : 'P.M.';
      const displayHour = hour % 12 || 12; // Convert 24-hour to 12-hour format
  
      for (let minutes of ['00', '15', '30', '45']) {
        // Special case for 12:00 P.M. and 9:00 P.M.
        if (hour === 12 && minutes === '00') {
          timeSlots.push(`${displayHour}:${minutes} P.M.`);
        } else if (hour === 21 && minutes === '00') {
          timeSlots.push(`9:00 P.M.`);
        } else {
          timeSlots.push(`${displayHour}:${minutes} ${period}`);
        }
      }
    }
  
    return timeSlots.map((time) => ({
      Date: formDate(today),
      Time: time,
    }));
  };
  


  const rowsToRender = data.length === 0 ? generateTodayRows() : data;

  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdminAccess(!showAdminAccess)}
          className="bg-custom-red text-white px-4 py-2 rounded"
        >
          Admin
        </button>
      </div>

      {showAdminAccess && <AdminAccess />}

      <h1 className="text-2xl font-semibold text-center mb-4">Show Result</h1>
      <div className="flex flex-row justify-center space-x-4 mb-4">
        <div className="flex flex-row">
          <label className="text-sm font-bold mb-1" htmlFor="startDate">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-1 h-6 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-row">
          <label
            className="text-sm font-bold mb-1 flex flex-row"
            htmlFor="endDate"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-1 h-6 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-gray-400 text-white px-2 h-6 rounded hover:bg-gray-500"
        >
          Go
        </button>
      </div>

      <div>
        <p className="text-center text-sm font-bold mb-4">{resultText}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-white">
          <thead>
            <tr className="bg-custom-red text-white">
              <th className="border border-gray-300">Date</th>
              <th className="border border-gray-300">Time</th>
              <th className="border border-gray-300">MA</th>
              <th className="border border-gray-300">MB</th>
              <th className="border border-gray-300">MC</th>
              <th className="border border-gray-300">MD</th>
              <th className="border border-gray-300">ME</th>
              <th className="border border-gray-300">MF</th>
              <th className="border border-gray-300">MG</th>
              <th className="border border-gray-300">MH</th>
              <th className="border border-gray-300">MI</th>
              <th className="border border-gray-300">MJ</th>
            </tr>
          </thead>
          <tbody className="text-custom-yellow">
            {rowsToRender.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-200 text-white">
                  {formattedDate(item.Date)}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.Time}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MA || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MB || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MC || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MD || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.ME || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MF || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MG || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MH || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MI || ""}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {item.MJ || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
