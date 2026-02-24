import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/axios';
import formatHelper from '../../utils/formatHelper';

const ReimburstmentListDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [zoom, setZoom] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
               const res = await api.get(`/Reimburstment/${id}`);
               setData(res.data); 
            } catch (error) {
                console.log(error);
            }
        }
        fetchDetail();
    }, [id])
  
    const imageUrl = data?.receiptAttachment ? 
        `http://localhost:5279/${data.receiptAttachment.replace(/\\/g, '/')}` : null;

    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-700",
        Approved: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
    };

    if(!data) return <p>Loading...</p>

    return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reimbursement Detail</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Description</span>
          <span>{data.description}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Amount</span>
          <span>{formatHelper.formatCurrency(data.amount)}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Category</span>
          <span>{data.categoryName}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Expense Date</span>
          <span>{formatHelper.formatDate(data.expenseDate)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold">Status</span>
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              statusColor[data.status]
            }`}
          >
            {data.status}
          </span>
        </div>

        {data.rejectReason && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mt-3">
            <b>Reject Reason:</b> {data.rejectReason}
          </div>
        )}
      </div>

      {/* Receipt */}
      {imageUrl && (
        <div className="mt-6">
          <p className="font-semibold mb-2">Receipt</p>

          <img
            src={imageUrl}
            alt="Receipt"
            onClick={() => setZoom(true)}
            className="cursor-zoom-in rounded-xl border shadow-sm max-h-80 hover:opacity-90 transition"
          />

          <p className="text-sm text-gray-400 mt-1">
            Click image to zoom
          </p>
        </div>
      )}

      {/* Zoom Modal */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={imageUrl}
            alt="Zoomed Receipt"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ReimburstmentListDetail