import { useState, useEffect } from "react";
import api from "../../api/axios";

const ApprovalModal = ({ isOpen, onClose, reimbursement, actionType, onSuccess }) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNotes("");
    }
  }, [isOpen]);

  if (!isOpen || !reimbursement) return null;

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
        className="bg-white w-full max-w-[420px] rounded-xl shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b">
          <h3 className="font-bold text-lg">
            {actionType === "approve" ? "Approve" : "Reject"} Reimbursement
          </h3>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
            <p><b>Employee:</b> {reimbursement.employeeName}</p>
            <p><b>Category:</b> {reimbursement.categoryName}</p>
            <p><b>Status:</b> {reimbursement.reimburstmentStatus}</p>
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
            className="flex-1 border rounded py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-1 text-white rounded py-2 ${
              actionType === "approve"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {loading
              ? "Processing..."
              : actionType === "approve"
              ? "Approve"
              : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;