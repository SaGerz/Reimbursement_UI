import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import formatHelper from '../../utils/formatHelper';

export const ApprovalHistory = () => {
  const [page, setPage] = useState(1);;
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
  const fetchApprovalHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/Reimburstment/manager/approval-histories?page=${page}&pageSize=${pageSize}`);
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApprovalHistory();
  }, [page])

  return (
    <div className='bg-white p-6 rounded-shadow' >
          <h2 className="text-xl font-semibold mb-4">
            Approval History
          </h2>
          
          {
            loading ? (
              <p>Loading ...</p>
            ) : (
              <table className="w-full border">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-2">Employee</th>
                      <th className="p-2">Manager</th>
                      <th className="p-2">Action</th>
                      <th className="p-2">Date</th>
                    </tr>
                  </thead>
        
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr
                          key={item.reimburstmentID}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="p-2">
                            {item.createdBy}
                          </td>

                          <td className="p-2">
                            {item.actionBy}
                          </td>

                          <td className="p-2">
                            <span
                                className={`px-2 py-1 text-sm rounded ${statusStyle(
                                  item.actionType
                                )}`}
                            >
                              {item.actionType}
                            </span>
                          </td>

                          <td className="p-2 font-medium">
                            {formatHelper.formatDate(item.actionDate)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-500"
                          >
                          No data in payment queue
                        </td>
                      </tr> 
                    )}
                  </tbody>
              </table>
            )}
            <div className="flex items-center justify-between mt-4">
            {/* Info */}
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">

              {/* Prev */}
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

              {/* Page Numbers */}
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

              {/* Next */}
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
  )
}
