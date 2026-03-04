import { useEffect, useState } from "react";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper";
import PaymentProofModal from "../../components/modal/PaymentProofModal";

const PaymentQueue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 pindah keluar supaya bisa dipanggil ulang
  const fetchPaymentQueue = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        "/Reimburstment/finance/payment-queue"
      );
      setData(res.data);
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

      {/* 🔥 Modal */}
      <PaymentProofModal
        isOpen={isModalOpen}
        reimbursement={selected}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPaymentQueue} // ⬅️ ini penting
      />
    </div>
  );
};

export default PaymentQueue;