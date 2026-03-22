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
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose} // Klik di luar (backdrop) untuk tutup
      >
      {/* Modal Container: Ditambah flex-col dan max-h-screen */}
      <div 
        className="bg-white w-full max-w-[420px] max-h-[90vh] flex flex-col rounded-xl shadow-2xl animate-fadeIn overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Biar klik di dalam modal nggak ikutan nutup
      >
        
        {/* 1. Header: Tetap di atas */}
        <div className="p-5 border-b">
          <h3 className="text-lg font-bold text-gray-800">
            Confirm Payment
          </h3>
        </div>

        {/* 2. Scrollable Body: Area ini yang bakal scroll kalau konten/gambar kepanjangan */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          
          {/* Reimbursement Info */}
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
              <span className="text-gray-500">Amount:</span>
              <span className="font-bold text-blue-600 text-right">
                {formatHelper.formatCurrency(reimbursement.amount)}
              </span>
            </p>
            <div className="pt-2 border-t mt-2">
              <span className="text-gray-500 block mb-1">Description:</span>
              <p className="text-gray-700 italic leading-relaxed">
                "{reimbursement.descriptionReimburstment}"
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

          {/* Upload Section */}
          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Upload Payment Proof
            </label>

            <label className="flex flex-col items-center justify-center w-full px-4 py-5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition text-center group">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                  {file ? file.name : "Click to upload image"}
                </p>
                <p className="text-xs text-gray-400">JPG, PNG, or PDF up to 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Preview: Dibatasi tingginya biar nggak makan tempat */}
            {preview && (
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Preview Proof:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-60 object-contain rounded-xl border-2 border-gray-100 bg-gray-50"
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. Footer: Tetap di bawah (Sticky) */}
        <div className="p-5 border-t bg-gray-50/50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 active:scale-95 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[1.5] px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200 cursor-pointer"
          >
            {loading ? "Processing..." : "Confirm Payment"}
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

export default PaymentProofModal;