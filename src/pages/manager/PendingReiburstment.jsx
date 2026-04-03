import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import formatHelper from '../../utils/formatHelper';
import ApprovalModal from '../../components/modal/ApprovaModal';

const PendingReiburstment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const fetchPendingReimburstment = async () => {
    try {
      setLoading(true);
      const res = await api.get('Reimburstment/pending');
      setData(res.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingReimburstment();
  }, [])

  return (
    <div className='bg-white p-6 rounded-shadow' >
      <h2 className="text-xl font-semibold mb-4">
        Approval Pending
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
      <table className="w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Employee</th>
              <th className="p-2">Category</th>
              <th className="p-2">CreateAt</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                  <tr
                    key={item.reimburstmentId}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-2">
                      {item.employeeName}
                    </td>

                    <td className="p-2">
                      {item.categoryName}
                    </td>

                    <td className="p-2">
                      { formatHelper.formatDate(item.createAt)}
                    </td>

                    <td className="p-2 font-medium">
                      <span className='px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-700'>
                        {item.reimburstmentStatus}
                      </span>
                    </td>

                   <td className="p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setSelected(item);
                          setActionType("approve");
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setSelected(item);
                          setActionType("reject");
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
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

      <ApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reimbursement={selected}
        actionType={actionType}
        onSuccess={fetchPendingReimburstment}
      />
    </div>
  )
}

export default PendingReiburstment