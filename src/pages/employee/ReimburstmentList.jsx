import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper.js"

const ReimbursementList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

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
      const fetchReimburstment = async () => {
        try {
          const res = await api.get(`/Reimburstment?page=${page}&pageSize=${pageSize}`)
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error(error);
        }
      }

      fetchReimburstment();
    }, [page])


    return(
      <div className="bg-white p-6 rounded shadow" >
        <h2 className="text-xl font-semibold mb-4">My reimburstment</h2>

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
              data.map((item) => (
                <tr
                  key={item.reimbursementId}
                  className="border-t hover:bg-gray-100 cursor-pointer"
                  onClick={() => 
                    navigate(`/employee/reimburstment/${item.reimbursementId}`)
                  }
                >
                  <td className="p-2">
                    {formatHelper.formatDate(item.expenseDate || item.expeseDate)}
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
            }
          </tbody>
        </table>

        {/* Pagination Start */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-3 py-1 rounded border text-sm cursor-pointer ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 3), page + 2) 
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded border text-sm cursor-pointer ${
                  p === page
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-3 py-1 rounded border text-sm cursor-pointer ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
};

export default ReimbursementList;
