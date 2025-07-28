"use client";

import React, { useState } from "react";

const SpeechController = () => {
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/start", { method: "POST" });
      setStatus("recording");
    } catch (err) {
      alert("Failed to start recording.");
    }
    setLoading(false);
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/stop", { method: "POST" });
      setStatus("stopped");
    } catch (err) {
      alert("Failed to stop recording.");
    }
    setLoading(false);
  };

  const getStatusColor = () => {
    if (status === "recording") return "text-green-600";
    if (status === "stopped") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl px-10 py-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-purple-700">
          🎙️ Voice Recording Control
        </h2>

        <div className="flex justify-center space-x-6 mb-4">
          <button
            onClick={handleStart}
            disabled={status === "recording" || loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              status === "recording"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Start
          </button>

          <button
            onClick={handleStop}
            disabled={status !== "recording" || loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              status !== "recording"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Stop
          </button>
        </div>

        <p className={`text-center font-semibold text-lg ${getStatusColor()}`}>
          Status: {status === "idle" ? "Not started" : status}
        </p>
      </div>
    </div>
  );
};

export default SpeechController;
