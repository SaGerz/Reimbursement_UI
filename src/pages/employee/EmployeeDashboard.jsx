import { useEffect, useState } from "react";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper";

const EmployeeDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/Reimburstment/Dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const statusStyle = (status) => {
    switch(status)
    {
      case "Approved":
        return "bg-green-100 text-green-700"
      
      case "Rejected":
        return "bg-red-100 text-red-700"
      
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Reimbursement",
      value: data?.totalReimburstment || 0,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Amount",
      value: formatHelper.formatCurrency(data?.totalAmount) || 0,
      color: "bg-purple-100 text-purple-700",
    },
    ,
    {
      title: "Paid",
      value: formatHelper.formatCurrency(data?.totalPaid) || 0,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Approved",
      value: data?.totalApprove || 0,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Rejected",
      value: data?.totalRejected || 0,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Pending",
      value: data?.totalPending || 0,
      color: "bg-yellow-100 text-yellow-700",
    }
  ];

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-sm ${card.color}`}
          >
            <h3 className="text-sm font-medium">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-5">
        <table className="w-full border" >
          <thead className="bg-gray-100 text-left" >
            <tr>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Nominal</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {
              data && data.recent && data.recent.length > 0 ? (

                data.recent.map((item) => (
                  <tr
                    key={item.reimbursementId}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="p-2">
                      {formatHelper.formatDate(item.createAt || item.createAt)}
                    </td>
                    <td className="p-2">{item.categoryName}</td>
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 font-medium">{formatHelper.formatCurrency(item.amount)}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 text-sm rounded ${statusStyle(
                        item.status
                      )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500"
                  >
                  No data in new reimbursement
                </td>
              </tr> 
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;