import React from "react";

const HistoryModal = ({ visible, onClose, message }) => {
  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div 
        className="bg-white w-[400px] max-h-[500px] rounded-lg shadow-xl p-5 overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-2">Order History</h2>

        <pre className="whitespace-pre-wrap text-sm">
          {message}
        </pre>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
