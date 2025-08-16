import axios from "axios";
import React, { useState } from "react";
import "./QrCode.css";

function QrCode() {
  let [size, setSize] = useState("100x100");
  let [imgURL, setimgURL] = useState("");
  let [href, setHref] = useState("");
  function getURL() {
    if (imgURL == "") {
      alert("Enter an URL");
      return;
    }
    let url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${imgURL}`;
    setHref(url);
    setimgURL('')
  }
  function downloadCode() {
  if (!href) {
    alert("Generate QR first.");
    return;
  }

  fetch(href)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(err => console.error("Download failed:", err));
}
  return (
    <div className="qrcodediv">
      <input
        type="text"
        value={imgURL}
        onChange={(e) => setimgURL(e.target.value)}
        placeholder="Enter URL"
      />
      <div className="input">
        <p>Select size:</p>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="100x100">100x100</option>
          <option value="150x150">150x150</option>
          <option value="200x200">200x200</option>
        </select>
      </div>
      <div className="img">{href && <img src={href} alt="qr code"/>}</div>
      <div className="btns">
        <button onClick={getURL}>Generate</button>
        <button onClick={downloadCode}>Download</button>
      </div>
    </div>
  );
}

export default QrCode;
