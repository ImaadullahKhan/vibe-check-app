import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  X, 
  Image as ImageIcon, 
  Trash2, 
  Sparkles,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { saveImageFile, clearAllCustomImages, getUploadedImageCount } from '../utils/imageStore';
import { MENU_IMAGE_REGISTRY } from '../utils/menuImageMapper';
import { MENU_ITEMS } from '../data/menuData';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedPreview {
  file: File;
  dataUrl: string;
  matchedItemId?: number;
  matchedItemName?: string;
  matchedFilename?: string;
  status: 'matched' | 'unmatched' | 'saved';
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose }) => {
  const [previews, setPreviews] = useState<UploadedPreview[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const matchFileToMenuItem = (fileName: string) => {
    const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 1. Exact match against MENU_IMAGE_REGISTRY
    for (const [idStr, config] of Object.entries(MENU_IMAGE_REGISTRY)) {
      const id = Number(idStr);
      const expectedClean = config.expectedFilename.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanFileName === expectedClean || cleanFileName.includes(expectedClean) || expectedClean.includes(cleanFileName)) {
        const item = MENU_ITEMS.find((m) => m.id === id);
        return { matchedItemId: id, matchedItemName: item?.name || config.name, matchedFilename: config.expectedFilename };
      }
      if (config.altFilenames) {
        for (const alt of config.altFilenames) {
          const altClean = alt.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (cleanFileName === altClean || cleanFileName.includes(altClean)) {
            const item = MENU_ITEMS.find((m) => m.id === id);
            return { matchedItemId: id, matchedItemName: item?.name || config.name, matchedFilename: config.expectedFilename };
          }
        }
      }
    }

    // 2. Match against item names
    for (const item of MENU_ITEMS) {
      const nameClean = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanFileName.includes(nameClean) || nameClean.includes(cleanFileName)) {
        const config = MENU_IMAGE_REGISTRY[item.id];
        return { matchedItemId: item.id, matchedItemName: item.name, matchedFilename: config?.expectedFilename || `${nameClean}.jpeg` };
      }
    }

    return null;
  };

  const handleFiles = (files: FileList | File[]) => {
    const fileList = Array.from(files);
    const newPreviews: UploadedPreview[] = [];

    fileList.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const match = matchFileToMenuItem(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreviews((prev) => [
          ...prev,
          {
            file,
            dataUrl,
            matchedItemId: match?.matchedItemId,
            matchedItemName: match?.matchedItemName,
            matchedFilename: match?.matchedFilename || file.name,
            status: match ? 'matched' : 'unmatched',
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    let savedCount = 0;

    for (const preview of previews) {
      // Save by original filename
      await saveImageFile(preview.file, preview.file.name);

      // Save by matched expected filename and item ID
      if (preview.matchedFilename) {
        await saveImageFile(preview.file, preview.matchedFilename);
      }
      if (preview.matchedItemId) {
        await saveImageFile(preview.file, preview.matchedItemId);
      }
      if (preview.matchedItemName) {
        await saveImageFile(preview.file, preview.matchedItemName);
      }
      savedCount++;
    }

    setIsSaving(false);
    setSaveSuccessMessage(`Successfully applied ${savedCount} live photos to your menu!`);
    setTimeout(() => {
      setSaveSuccessMessage(null);
      onClose();
    }, 1500);
  };

  const handleManualSelect = (index: number, itemId: number) => {
    const item = MENU_ITEMS.find((m) => m.id === itemId);
    const config = MENU_IMAGE_REGISTRY[itemId];
    setPreviews((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        matchedItemId: itemId,
        matchedItemName: item?.name || `Item #${itemId}`,
        matchedFilename: config?.expectedFilename || `item-${itemId}.jpeg`,
        status: 'matched',
      };
      return updated;
    });
  };

  const handleRemovePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Instant Menu Photo Uploader
              </h3>
              <p className="text-xs text-slate-400">
                Drop your JPEG/PNG files to make them live on the menu instantly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dropzone */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-rose-500/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-950/80 text-center group"
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-rose-500/20 group-hover:text-rose-400 flex items-center justify-center text-slate-400 transition-colors mb-3">
              <ImageIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-white">
              Drag & drop your burger images here, or <span className="text-rose-400 underline">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports .jpeg, .jpg, .png (Auto-matches names like burgers_BF-Smash-OG-Single-Beef.jpeg)
            </p>
          </div>

          {/* Uploaded Previews */}
          {previews.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                <span>Selected Photos ({previews.length})</span>
                <button
                  onClick={() => setPreviews([])}
                  className="text-rose-400 hover:text-rose-300"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {previews.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs"
                  >
                    <img
                      src={p.dataUrl}
                      alt={p.file.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{p.file.name}</p>
                      {p.matchedItemName ? (
                        <div className="flex items-center gap-1 text-emerald-400 text-[11px] mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Matches: {p.matchedItemName}</span>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <select
                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-[11px] rounded px-1.5 py-0.5 outline-none focus:border-rose-500"
                            onChange={(e) => handleManualSelect(idx, Number(e.target.value))}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select matching item...
                            </option>
                            {MENU_ITEMS.map((item) => (
                              <option key={item.id} value={item.id}>
                                #{item.id} {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemovePreview(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {saveSuccessMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={async () => {
              if (confirm('Clear all custom uploaded photos?')) {
                await clearAllCustomImages();
                alert('Cleared uploaded photos.');
              }
            }}
            className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
          >
            Reset uploaded photos
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={previews.length === 0 || isSaving}
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:pointer-events-none text-white transition-all shadow-lg shadow-rose-950/40 flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Applying...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Make {previews.length} Photo{previews.length === 1 ? '' : 's'} Live</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
