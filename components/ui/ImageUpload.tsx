"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/app/actions/cms";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}

export default function ImageUpload({ onUploadSuccess, isUploading, setIsUploading }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    const fileList = Array.from(files);
    
    try {
      for (const file of fileList) {
        if (!file.type.startsWith("image/")) {
          setError(`File "${file.name}" is not an image`);
          continue;
        }

        if (file.size > 3 * 1024 * 1024) { // 3MB Limit
          setError(`"${file.name}" exceeds 3MB limit`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadImage(formData);

        if (result.error) {
          throw new Error(result.error);
        }

        if (result.url) {
          onUploadSuccess(result.url);
        }
      }
      
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload one or more images");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3 font-inter">
      <div 
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed border-[#eeeeee] bg-[#F9F9F9] p-8 text-center cursor-pointer hover:border-[#C0001A] transition-all flex flex-col items-center justify-center min-h-[160px] ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg,image/png,image/webp" 
          onChange={handleUpload}
          disabled={isUploading}
          multiple
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-3 text-[#111]">
            <Loader2 size={24} className="animate-spin text-[#C0001A]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Uploading Media...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
             <div className="w-10 h-10 bg-[#111] text-white flex items-center justify-center">
                <UploadCloud size={20} />
             </div>
             <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111] block mb-1">Click to Upload Image</span>
                <span className="text-[9px] text-[#666] uppercase tracking-widest">JPEG, PNG, WEBP (Max 3MB)</span>
             </div>
          </div>
        )}
      </div>

      {error && (
        <div className="fixed top-10 right-10 z-[100] bg-[#C0001A] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest shadow-2xl animate-in fade-in slide-in-from-top-5 flex items-center gap-3">
           <X size={14} /> {error}
        </div>
      )}
    </div>
  );
}
