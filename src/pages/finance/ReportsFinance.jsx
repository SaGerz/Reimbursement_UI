import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import formatHelper from '../../utils/formatHelper';

function ReportsFinance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());


  const fetchPaymentReport = async () => {
    try {
      setLoading(true)
      const res = await api.get(
        `Reimburstment/finance/reports/employee?month=${month}&year=${year}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPaymentReport();
  }, [month, year])

  return (
    <div className='bg-white p-6 rounded shadow' >
      <h2 className='text-xl font-semibold mb-4'>Report Finance</h2>
      
      {/* FILTER SECTION */}
      <div className='flex gap-4 py-3'>
        <select 
          value={month} 
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="border p-2 rounded bg-gray-50"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
            </option>
          ))}
        </select>

        <select 
          value={year} 
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border p-2 rounded bg-gray-50"
        >
          {[2023, 2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Employee Name</th>
                <th className="p-2">Total Amount</th>
                <th className="p-2">Total Request</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item.employeeId}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-2">
                        {item.employeeName}
                    </td>
                    <td className="p-2">
                        {formatHelper.formatCurrency(item.totalAmount)}
                    </td>
                    <td className="p-2">
                        {item.totalRequest}
                    </td>
                  </tr>
                ))
              ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-4 text-gray-500"
                >
                  No data in payment queue
                </td>
              </tr>
              )}
            </tbody>
        </table>
      )
      }
    </div>
  )
}

export default ReportsFinance