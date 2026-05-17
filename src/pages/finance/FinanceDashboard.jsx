import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import formatHelper from '../../utils/formatHelper';

function FinanceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get('/Reimburstment/finance/dashboard');
      setData(res.data);
    } catch (error) {
       console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  } 

  const cards = [
    {
      title: "Pending Payment",
      value: data?.totalPendingPayment || 0,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Pending Amount",
      value: formatHelper.formatCurrency(
        data?.totalAmountPending || 0
      ),
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Paid This Month",
      value: data?.paidThisMount || 0,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Total Paid Amount",
      value: formatHelper.formatCurrency(
        data?.totalPaidThisMonth || 0
      ),
      color: "bg-blue-100 text-blue-700",
    },
    // {
    //   title: "Rejected This Month",
    //   value: data?.totalRejectThisMonth || 0,
    //   color: "bg-red-100 text-red-700",
    // },
  ];

  useEffect(() => {
    fetchDashboard();
  }, [])

  return (
    <div className='bg-white p-6 rounded shadow' >
      <h1 className='text-xl font-semibold mb-4'>Finance Dashboard</h1>
    
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {cards.map((card, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm ${card.color}`}>
            <h3 className='text-sm font-medium'>{card.title}</h3>
            <p className='text-2xl font-bold mt-2'>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinanceDashboard