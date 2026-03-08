import { useState, useEffect } from "react";
import api from "../../api/axios";
import formatHelper from "../../utils/formatHelper";

const PaymentProofModal = ({ isOpen, onClose, reimbursement, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Reset state setiap modal dibuka / ditutup
  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setPreview(null);
    }
  }, [isOpen]);

  if (!isOpen || !reimbursement) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const receiptAttachment = reimbursement.receiptAttachment ? 
  `http://localhost:5279/${reimbursement.receiptAttachment.replace(/\\/g, '/')}` : null;

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload payment proof");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("PaymentAttachment", file);

      await api.post(
        `/Reimburstment/finance/reimburstment/${reimbursement.reimbursementId}/payment-proof`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to upload payment proof");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] p-6 rounded-xl shadow-xl animate-fadeIn">
        
        <h3 className="text-lg font-semibold mb-4">
          Confirm Payment
        </h3>

        {/* Reimbursement Info */}
        <div className="mb-5 text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
          <p>
            <span className="font-medium">Employee:</span>{" "}
            {reimbursement.employeeName}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {reimbursement.categoryName}
          </p>
          <p>
            <span className="font-medium">Amount:</span>{" "}
            {formatHelper.formatCurrency(reimbursement.amount)}
          </p>
          <p>
            <span className="font-medium">Recipt:</span>
            <img 
              src={receiptAttachment} 
              alt="receiptAttachment" 
              onClick={() => setZoom(receiptAttachment)}
              className="cursor-zoom-in rounded-xl border shadow-sm max-h-45 hover:opacity-90 transition"
             />
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Click image to zoom
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Upload Payment Proof
          </label>

          <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition text-center">
            <span className="text-sm text-gray-600">
              {file ? file.name : "Click to upload image"}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={zoom}
            alt="Zoomed Receipt"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentProofModal;