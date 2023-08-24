import React, { createContext, useContext, useState, useEffect } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert(message);

    // Automatically hide the alert after the specified timeout
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {alert && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4">
          <div
            className="bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 shadow-md relative">
            <p>{alert}</p>
            <button type="button"
              className="absolute top-0 right-0 -mt-2 -mr-2 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-200 focus:ring-2 focus:ring-red-400"
              onClick={hideAlert} aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);