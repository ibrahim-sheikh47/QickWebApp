import React, { useState, useEffect } from "react";
import assets from "../../assets/assets";

const AttachmentPreview = ({ attachments, onAttachmentsChange, onClick }) => {
  const [localAttachments, setLocalAttachments] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (attachments && attachments.length > 0) {
      setLocalAttachments(attachments); // Initialize local attachments
      loadPreviews(attachments);
    }
  }, [attachments]);

  const loadPreviews = async (attachments) => {
    const promises = attachments.map((attachment) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result); // Resolve with Base64 URL
        reader.onerror = (error) => reject(error); // Handle errors
        reader.readAsDataURL(attachment); // Read file as Base64
      });
    });

    try {
      const results = await Promise.all(promises); // Wait for all files to process
      setPreviews(results); // Store Base64 URLs
    } catch (error) {
      console.error("Error loading previews:", error);
    }
  };

  const removeAttachment = (index) => {
    const updatedAttachments = localAttachments.filter((_, i) => i !== index);
    setLocalAttachments(updatedAttachments);
    setPreviews(previews.filter((_, i) => i !== index)); // Update previews as well
    if (onAttachmentsChange) onAttachmentsChange(updatedAttachments); // Notify parent of the change
  };

  return (
    <div className="flex gap-4 mt-4">
      {previews.map((preview, index) => (
        <div
          key={index}
          className="relative group border-[2px] border-black rounded"
          style={{ cursor: "pointer", overflow: "hidden" }}
        >
          <img
            onClick={() => onClick(preview)}
            src={preview}
            className="h-[100px] w-[100px] object-cover"
            alt={`Attachment ${index}`}
          />
          <button
            onClick={() => removeAttachment(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <img src={assets.cross} className="w-[16px] h-[16px]" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AttachmentPreview;
