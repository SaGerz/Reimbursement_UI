import { useState, useEffect } from "react";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper";

const ApprovalModal = ({ isOpen, onClose, reimbursement, actionType, onSuccess }) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNotes("");
    }
  }, [isOpen]);

  if (!isOpen || !reimbursement) return null;

  const receiptAttachment = reimbursement.receiptAttachment ? 
  `http://localhost:5279/${reimbursement.receiptAttachment.replace(/\\/g, '/')}` : null;

  const handleSubmit = async () => {
    if (actionType == "reject" && !notes) {
      alert("Notes is required");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        actionType === "approve"
          ? `/Reimburstment/manager/${reimbursement.reimburstmentId}/approve`
          : `/Reimburstment/manager/${reimbursement.reimburstmentId}/reject`;

      await api.post(endpoint, {
        managerRejectedNotes: notes
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to process");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40  backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[420px] max-h-[90vh] flex flex-col rounded-xl shadow-2xl animate-fadeIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b">
          <h3 className="font-bold text-lg">
            {actionType === "approve" ? "Approve" : "Reject"} Reimbursement
          </h3>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          <div className="mb-6 text-sm space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="flex justify-between">
                <span className="text-gray-500">Employee:</span>
                <span className="font-semibold text-right">{reimbursement.employeeName}</span>
            </p>
            <p className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="font-semibold text-right">{reimbursement.categoryName}</span>
            </p>
            <p className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-right">{reimbursement.reimburstmentStatus}</span>
            </p>
            <p className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-blue-600 text-right">
                {formatHelper.formatCurrency(reimbursement.amount)}
                </span>
            </p>
            <div className="pt-2 border-t mt-2">
              <span className="text-gray-500 block mb-1">Description:</span>
              <p className="text-gray-700 italic leading-relaxed">
                "{reimbursement.description}"
              </p>
            </div>

            <div className="pt-2">
              <span className="text-gray-500 block mb-2">Original Receipt:</span>
              <img 
                src={receiptAttachment} 
                alt="receipt" 
                onClick={() => setZoom(receiptAttachment)}
                className="cursor-zoom-in rounded-lg border w-full h-32 object-cover hover:brightness-90 transition"
              />
              <p className="text-[10px] text-gray-400 mt-1 text-center italic">
                Click image to zoom
              </p>
            </div>
          </div>

          {/* Notes */}
          {actionType === "reject" && (
            <div>
                <label className="block text-sm font-semibold mb-2">
                Notes
                </label>
                <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                rows={3}
                placeholder="Enter notes..."
                />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border rounded py-2 cursor-pointer hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-1 text-white rounded py-2 cursor-pointer ${
              actionType === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading
              ? "Processing..."
              : actionType === "approve"
              ? "Approve"
              : "Reject"}
          </button>
        </div>

        {/* Zoom Modal */}
        {zoom && (
          <div
            onClick={() => setZoom(false)}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 cursor-zoom-out"
          >
            <img
              src={zoom}
              alt="Zoomed Receipt"
              className="max-h-full max-w-full rounded-lg shadow-2xl animate-zoomIn"
            />
          </div>
        )}

        {/* Inline Style untuk Scrollbar Cantik */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ApprovalModal;