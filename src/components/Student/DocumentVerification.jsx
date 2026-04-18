import { useState, useRef } from "react";
import { 
  CloudUpload as UploadIcon, 
  DocumentScanner as ScannerIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Description as FileIcon,
  Send as SendIcon
} from "@mui/icons-material";

function DocumentVerification({ studentName, onComplete }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, success, failed
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setStatus("idle");
      setMessage("");
    } else {
      setMessage("Please upload a PDF file (Class 12th Marksheet or JEE Mains Scorecard).");
      setStatus("failed");
    }
  };

  const uploadToLocal = async () => {
    if (!file) return;
    setStatus("uploading");
    setMessage("Processing PDF...");

    try {
      // Convert PDF to base64 for local storage
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        
        // Pass the file data to parent component (local storage only)
        onComplete({ 
          status: "Verified", 
          data: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadDate: new Date().toISOString(),
            pdfData: base64Data
          }
        });
        
        setStatus("success");
        setMessage("PDF ready. Lock your preferences to send to admin for verification.");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setStatus("failed");
      setMessage("Error processing PDF. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 p-6 space-y-6 bg-black/20">
      <div className="flex items-center gap-3 mb-2">
        <ScannerIcon className="text-blue-500" />
        <div>
          <h3 className="text-base font-black text-white font-['Outfit']">Document Upload</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Upload Class 12th Marksheet or JEE Mains Scorecard (PDF Only)</p>
        </div>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
        >
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadIcon className="text-zinc-400 group-hover:text-blue-400" />
          </div>
          <p className="text-sm font-bold text-white mb-1">Click to browse or drag PDF here</p>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">PDF Format Only (Max 10MB)</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf,application/pdf" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <FileIcon className="text-zinc-400" />
              <div>
                <p className="text-xs font-bold text-white truncate max-w-[200px]">{file.name}</p>
                <p className="text-[10px] text-zinc-500 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {(status === "idle" || status === "failed") && (
              <button onClick={() => setFile(null)} className="text-[10px] font-bold text-rose-400 uppercase hover:text-rose-300">Remove</button>
            )}
          </div>

          {status === "idle" && (
            <button
              onClick={uploadToLocal}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              <SendIcon sx={{ fontSize: 16 }} />
              Confirm PDF
            </button>
          )}

          {status === "uploading" && (
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/10 text-center space-y-3">
              <p className="text-xs font-bold text-blue-400 animate-pulse">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex items-start gap-3">
              <CheckCircleIcon className="text-emerald-500 shrink-0 mt-0.5" />
              <div className="w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm font-black text-emerald-400 font-['Outfit']">PDF Confirmed</p>
                  <button onClick={() => { setFile(null); setStatus("idle"); }} className="text-[10px] font-black uppercase text-emerald-300 hover:text-white flex items-center gap-1">Replace PDF</button>
                </div>
                <p className="text-[10px] font-bold text-emerald-500/80 mt-1 uppercase tracking-widest">{message}</p>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 flex items-start gap-3">
              <ErrorIcon className="text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-rose-400 font-['Outfit']">Upload Failed</p>
                <p className="text-[10px] font-bold text-rose-400/80 mt-1 uppercase tracking-widest leading-relaxed">{message}</p>
                <button onClick={() => { setFile(null); setStatus("idle"); }} className="mt-3 text-[10px] font-black uppercase text-white bg-rose-600/50 px-3 py-1.5 rounded hover:bg-rose-600 transition-all">Upload New File</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentVerification;
