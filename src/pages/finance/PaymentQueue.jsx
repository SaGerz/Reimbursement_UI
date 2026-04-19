import { useEffect, useState } from "react";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper";
import PaymentProofModal from "../../components/modal/PaymentProofModal";

const PaymentQueue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPaymentQueue = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/Reimburstment/finance/payment-queue?${page}&pageSize=${pageSize}`
      );
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentQueue();
  }, []);

  const handleProcessPayment = (item) => {
    setSelected(item);       // kirim full object biar modal bisa tampilkan info
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Payment Queue
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Approved At</th>
              <th className="p-2">Employee</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.reimbursementId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-2">
                    {formatHelper.formatDate(item.approveAt)}
                  </td>

                  <td className="p-2">{item.employeeName}</td>

                  <td className="p-2">{item.categoryName}</td>

                  <td className="p-2 font-medium">
                    {formatHelper.formatCurrency(item.amount)}
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() => handleProcessPayment(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Process
                    </button>
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

      {/* Pagination Start : */}
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

      {/* 🔥 Modal */}
      <PaymentProofModal
        isOpen={isModalOpen}
        reimbursement={selected}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPaymentQueue}
      />
    </div>
  );
};

export default PaymentQueue;