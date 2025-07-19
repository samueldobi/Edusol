"use client";
import { useState } from "react";

const predefinedTags = [
  { name: "Result", color: "bg-green-100 text-green-800" },
  { name: "Important", color: "bg-red-100 text-red-800" },
  { name: "Payment", color: "bg-blue-100 text-blue-800" },
  { name: "Dashboard", color: "bg-purple-100 text-purple-800" },
  { name: "Social", color: "bg-yellow-100 text-yellow-800" },
  { name: "PTA", color: "bg-pink-200 text-black" },
];

const recipients = ["Students", "Teachers", "All"];

export default function ComposeNotificationModal({onClose}) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [customTag, setCustomTag] = useState("");
  const [customColor, setCustomColor] = useState("#28a745");

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        onClick={onClose}>
        <div 
        onClick={(e)=> e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[80vh] overflow-y-auto">
        {/* Tag Selection */}
        <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Create Tag</label>
            <div className="flex flex-wrap gap-2 mb-3">
            {predefinedTags.map((tag, idx) => (
                <div
                key={idx}
                className={`px-3 py-1 text-sm border rounded cursor-pointer transition ${
                    selectedTag === tag.name
                    ? "bg-green-600 text-white border-green-600"
                    : `${tag.color} border-gray-300`
                }`}
                onClick={() => setSelectedTag(tag.name)}
                >
                {tag.name}
                </div>
            ))}
            </div>
            <div className="flex items-center gap-3">
            <input
                type="text"
                placeholder="New Tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <label className="text-sm">Pick color</label>
            <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-8 h-8 border rounded"
            />
            </div>
        </div>

        {/* Recipient Selection */}
        <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Recipients</label>
            <div className="flex flex-wrap gap-2 mb-3">
            {recipients.map((recipient, idx) => (
                <div
                key={idx}
                className={`px-3 py-1 text-sm border rounded cursor-pointer transition ${
                    selectedRecipient === recipient
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => setSelectedRecipient(recipient)}
                >
                {recipient}
                </div>
            ))}
            </div>
            <div>
            <input
                type="text"
                placeholder="Direct message / Student ID"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
            </div>
        </div>

        {/* Title */}
        <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Compose Title</label>
            <input
            type="text"
            placeholder="Enter notification title"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
        </div>

        {/* Body */}
        <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Compose Body</label>
            <textarea
            placeholder="Enter notification content"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm min-h-[120px] resize-y"
            />
        </div>

        {/* Create Button */}
        <div className="text-right">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded">
            ✚ CREATE
            </button>
        </div>
        </div>
    </div>
  );
}
