import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  const successCallback = (result) => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
    setScanResult(result);
  };

  const errorCallback = (error) => {
    console.error("QR Code Scanner Error:", error);
    // Handle error states as needed
  };

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner("reader", {
        qrbox: { width: 300, height: 300 },
        fps: 5,
      });
    }

    scannerRef.current.render(successCallback, errorCallback);

    return () => {
      // Check if scannerRef.current has the stop method
      if (scannerRef.current && typeof scannerRef.current.stop === "function") {
        scannerRef.current.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader"></div>
      {scanResult && <p>Scan Result: {scanResult}</p>}
    </div>
  );
}

export default App;
