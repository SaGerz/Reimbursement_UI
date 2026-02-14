import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper.js"

const ReimbursementList = () => {
    const [data, setData] = useState([]);
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
          const res = await api.get('/Reimburstment')
          setData(res.data);
        } catch (error) {
          console.error(error);
        }
      }

      fetchReimburstment();
    }, [])


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
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  // onClick={
                  //   navigate(`/employee/reimbursements/${item.reimbursementId}`)
                  // }
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
      </div>
    );
};

export default ReimbursementList;
