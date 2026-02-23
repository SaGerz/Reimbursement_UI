import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/axios';

const ReimburstmentListDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);

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

    console.log(imageUrl);

    if(!data) return <p>Loading...</p>

    return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Detail Reimbursement</h2>

        <p><b>Description : </b>{data.description}</p>
        <p><b>Amount : </b>{data.amount}</p>
        <p><b>Category Name : </b>{data.categoryName}</p>
        <p><b>Expense Date : </b>{data.expenseDate}</p>
        <p><b>Status : </b>{data.status}</p>

        {data.rejectReason && (
            <p className="text-red-500">
                <b>Reject Reason:</b> {data.rejectReason}
            </p>
        )}

        {imageUrl && (
            <div className="mt-4">
                <p className="font-semibold mb-2">Receipt:</p>
                <img
                src={imageUrl}
                alt="Receipt"
                className="rounded border max-h-80"
                />
            </div>
        )}
    </div>
  )
}

export default ReimburstmentListDetail