"use client";
import { useState } from "react";
import { createNotification, createTagAndReturnId } from "../../src/api/services/notificationService";

interface ComposeNotificationModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const predefinedTags = [
  { name: "Result", color: "bg-green-100 text-green-800" },
  { name: "Important", color: "bg-red-100 text-red-800" },
  { name: "Payment", color: "bg-blue-100 text-blue-800" },
  { name: "Dashboard", color: "bg-purple-100 text-purple-800" },
  { name: "Social", color: "bg-yellow-100 text-yellow-800" },
  { name: "PTA", color: "bg-pink-200 text-black" },
];

const recipients = ["Students", "Teachers", "All"];

export default function ComposeNotificationModal({ onClose, onSuccess }: ComposeNotificationModalProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState("");
  const [customColor, setCustomColor] = useState("#28a745");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [notificationType, setNotificationType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      setError("Title and message are required");
      return;
    }

    if (!selectedRecipient && !recipientId.trim()) {
      setError("Please select a recipient or enter a recipient ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tagName = selectedTag || customTag || "General";
      const tagColor = customColor;

      const tagId = await createTagAndReturnId(tagName, tagColor);

      const notificationPayload = {
        title: title.trim(),
        message: message.trim(),
        type: notificationType,
        recipient_id: recipientId.trim() || selectedRecipient || "all",
        tag: tagId,
      };

      await createNotification(notificationPayload);

      // Reset form
      setTitle("");
      setMessage("");
      setRecipientId("");
      setSelectedRecipient(null);
      setSelectedTag(null);
      setCustomTag("");
      setNotificationType('info');
      
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      console.error('Failed to create notification:', err);
      setError("Failed to create notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Compose Notification</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Notification Type */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Notification Type</label>
          <div className="flex flex-wrap gap-2">
            {(['info', 'success', 'warning', 'error'] as const).map((type) => (
              <div
                key={type}
                className={`px-3 py-1 text-sm border rounded cursor-pointer transition ${
                  notificationType === type
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setNotificationType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            ))}
          </div>
        </div>

        {/* Tag Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Create Tag (Optional)</label>
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
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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
              placeholder="Direct message / Student ID (optional if group selected)"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Compose Title *</label>
          <input
            type="text"
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>

        {/* Body */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Compose Body *</label>
          <textarea
            placeholder="Enter notification content"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm min-h-[120px] resize-y"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                Creating...
              </div>
            ) : (
              '✚ CREATE'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
