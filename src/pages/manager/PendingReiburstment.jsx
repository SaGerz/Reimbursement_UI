import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import formatHelper from '../../utils/formatHelper';

const PendingReiburstment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

                    <td className="p-2">
                      <button
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
    </div>
  )
}

export default PendingReiburstment