import { useState, useEffect } from "react";
import axios from "axios";
import AdminAccess from "./admin/AdminAccess";
import '@fortawesome/fontawesome-free/css/all.min.css';

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
      setResultText(`From: ${formattedDate(startDate)} To: ${formattedDate(endDate)}`);
    } else if (startDate) {
      setResultText(`For Date: ${formattedDate(startDate)}`);
    } else {
      setResultText("Result of Today");
    }
  }, [startDate, endDate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/update");
        const updatedData = mergeWithGeneratedRows(response.data);
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching today's data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      if (!startDate && !endDate) {
        // No dates selected, fetch today's data using the /api/update endpoint
        const response = await axios.get("http://localhost:5003/api/update");
        const updatedData = mergeWithGeneratedRows(response.data);
        setData(updatedData);
      } else {
        const response = await axios.get("http://localhost:5003/api/items", {
          params: {
            startDate: startDate || formDate(new Date()),
            endDate: endDate || formDate(new Date()),
          },
        });
        setData(response.data);
      }
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

  const formatTime = (hour, minutes, period) => {
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const generateTodayRows = () => {
    const today = new Date();
    const timeSlots = [];
    
    for (let hour = 9; hour <= 21; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const interval = hour < 11 ? ['00', '15', '30', '45'] : ['00', '20', '40'];
  
      for (let minutes of interval) {
        timeSlots.push(formatTime(hour, minutes, period));
      }
    }
  
    return timeSlots.map((time) => ({
      Date: today.toISOString().split('T')[0],
      Time: time,
    }));
  };

  const mergeWithGeneratedRows = (fetchedData) => {
    const generatedRows = generateTodayRows();
    
    return generatedRows.map((row) => {
      const matchingRow = fetchedData.find((item) => item.Time === row.Time);
      return matchingRow || row;
    });
  };

  const handleDataUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/today-items");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-end mb-4 ml-[800px]">
      <button
  onClick={() => setShowAdminAccess(!showAdminAccess)}
  className="text-black p-2 rounded flex absolute top-4 left-4 lg:left-auto lg:right-4"
>
  <i className="flex flex-col-reverse fas fa-user-shield text-lg"></i>
</button>

      </div>

      {showAdminAccess && <AdminAccess onDataUpdate={handleDataUpdate} />}

      <h1 className="text-2xl font-semibold text-center mb-4">Show Result</h1>
      <div className="flex lg:flex-row flex-col lg:justify-center lg:gap-4 gap-2 mb-4 ml-8">
  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
    <label className="text-sm font-bold mb-1 lg:mb-0" htmlFor="startDate">
      Start Date:
    </label>
    <input
      type="date"
      id="startDate"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="px-2 py-1 border border-gray-300 rounded text-xs lg:text-base w-[250px]"
    />
  </div>

  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
    <label className="text-sm font-bold mb-1 lg:mb-0" htmlFor="endDate">
      End Date:
    </label>
    <input
      type="date"
      id="endDate"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="px-2 py-1 border border-gray-300 rounded text-xs lg:text-base w-[250px]"
    />
  </div>

  <button
    onClick={handleSearch}
    className="bg-gray-400 text-white px-2 py-1 h-auto rounded hover:bg-gray-500 text-xs lg:text-base w-[40px]"
  >
    Go
  </button>
</div>



      <div>
        <p className="text-center text-sm font-bold mb-4">{resultText}</p>
      </div>

      <div className="w-[1200px]">
        <table className="min-w-full bg-black border border-white text-xs sm:text-base">
          <thead>
            <tr className="bg-custom-red text-white">
              <th className="border border-gray-300 w-28 sm:w-28">Date</th>
              <th className="border border-gray-300 w-28 sm:w-28">Time</th>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-200 text-white w-24  sm:text-[18px]">
                  {formattedDate(item.Date)}
                </td>
                <td className="py-2 px-4 border border-gray-200 w-24 ">
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
