import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // Table Data
  const rows = [
    {
      id: 1,
      name: "Michael Holz",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "04/10/2013",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Paula Wilson",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "05/08/2014",
      role: "Publisher",
      status: "Active",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
      date: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Mary Saveley",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "06/09/2016",
      role: "Reviewer",
      status: "Active",
    },
    {
      id: 5,
      name: "Martin Sommer",
      img: "https://randomuser.me/api/portraits/men/77.jpg",
      date: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
    }
  ];

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const currentRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const statusColor = {
    Active: "bg-green-500",
    Inactive: "bg-yellow-500",
    Suspended: "bg-red-500",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.name || "User"}
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full">
        <h2 className="text-xl font-bold mb-4">User Management</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-700">
              <th className="p-3 text-left w-12">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Date Created</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-3 align-top">{row.id}</td>

                {/* Name + Image */}
                <td className="p-3 flex items-center space-x-3">
                  <img
                    src={row.img}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{row.name}</span>
                </td>

                <td className="p-3 align-top">{row.date}</td>
                <td className="p-3 align-top">{row.role}</td>

                {/* Status */}
                <td className="p-3 align-top flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${statusColor[row.status]}`}></span>
                  <span>{row.status}</span>
                </td>

               
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}
