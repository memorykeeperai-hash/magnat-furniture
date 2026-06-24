"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "@/app/actions/cms";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  className?: string;
  dimensions?: string;
}

export default function ImageUploadField({ label, name, defaultValue, className, dimensions }: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError("Oversized image (Max 3MB)");
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImage(formData);

      if (result.error) {
        setError(result.error);
        setTimeout(() => setError(null), 5000);
      } else if (result.url) {
        setUrl(result.url);
      }
    } catch (err: any) {
      console.error("Upload field error:", err);
      setError("An unexpected error occurred during upload.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">{label}</label>
      
      <div className="space-y-3">
        {/* Preview and URL Input */}
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-gray-50 border border-[#eeeeee] flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
            {url ? (
              <>
                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setUrl("")}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </>
            ) : (
              <ImageIcon size={20} className="text-gray-300" />
            )}
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <input 
              type="text" 
              name={name} 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste image URL here..."
              className="w-full p-3 bg-white border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            />
            
            <div className="flex flex-col gap-1.5 mt-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#111] hover:text-[#C0001A] transition-colors disabled:opacity-50"
                >
                  {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                {isUploading ? "Uploading..." : "Upload from Device"}
                </button>
              </div>
              
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                {dimensions ? `(Rec: ${dimensions} | Max 3MB)` : "(Max 3MB)"}
              </span>
            </div>
          </div>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {error && (
        <div className="fixed top-10 right-10 z-[100] bg-[#C0001A] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest shadow-2xl animate-in fade-in slide-in-from-top-5 flex items-center gap-3">
           <X size={14} /> {error}
        </div>
      )}
    </div>
  );
}
