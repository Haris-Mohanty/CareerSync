import { toast } from "sonner";

// Success toast function
export const showSuccessToast = (message) => {
  toast(message, {
    icon: (
      <svg
        className="w-6 h-6 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    style: {
      background: "#d4edda", // Light green background
      color: "#155724", // Dark green text
      border: "1px solid #c3e6cb", // Green border
      borderRadius: "8px",
      padding: "16px",
      fontSize: "14px",
    },
  });
};

// Error toast function
export const showErrorToast = (message) => {
  toast(message, {
    icon: (
      <svg
        className="w-6 h-6 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    style: {
      background: "#f8d7da", // Light red background
      color: "#721c24", // Dark red text
      border: "1px solid #f5c6cb", // Red border
      borderRadius: "8px",
      padding: "16px",
      fontSize: "14px",
    },
  });
};
