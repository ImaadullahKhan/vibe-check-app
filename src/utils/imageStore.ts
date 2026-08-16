/**
 * IndexedDB and Local Memory Image Store for Live Menu Photos
 * Allows direct browser drag & drop, file picker upload, and persistence across refreshes.
 */

const DB_NAME = 'buns_and_fellows_media_v1';
const STORE_NAME = 'menu_images';

// In-memory cache for ultra-fast synchronous lookups
const memoryCache = new Map<string, string>();
const listeners = new Set<() => void>();

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Subscribe to image store updates
export function subscribeToImageStore(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyListeners() {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error('Image store listener error:', e);
    }
  });
}

// Initialize memory cache from IndexedDB on startup
export async function initImageStore(): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    return new Promise((resolve) => {
      req.onsuccess = () => {
        const items = req.result as Array<{ key: string; dataUrl: string }>;
        if (items) {
          items.forEach((item) => {
            memoryCache.set(item.key.toLowerCase(), item.dataUrl);
            // Also store exact filename if present
            memoryCache.set(item.key, item.dataUrl);
          });
        }
        notifyListeners();
        resolve();
      };
      req.onerror = () => {
        resolve();
      };
    });
  } catch (err) {
    console.warn('Could not initialize image store from IndexedDB:', err);
  }
}

// Get image data URL by filename or item ID
export function getCustomImage(key: string | number): string | null {
  const k = String(key).toLowerCase().trim();
  return memoryCache.get(k) || memoryCache.get(String(key)) || null;
}

// Save image data URL
export async function saveCustomImage(key: string | number, dataUrl: string): Promise<void> {
  const primaryKey = String(key).trim();
  const lowerKey = primaryKey.toLowerCase();
  
  memoryCache.set(primaryKey, dataUrl);
  memoryCache.set(lowerKey, dataUrl);
  notifyListeners();

  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ key: primaryKey, dataUrl, updatedAt: Date.now() });
    store.put({ key: lowerKey, dataUrl, updatedAt: Date.now() });
  } catch (e) {
    console.warn('Failed to persist image to IndexedDB:', e);
  }
}

// Save a File directly
export async function saveImageFile(file: File, customKey?: string | number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const keyToUse = customKey || file.name;
      await saveCustomImage(keyToUse, dataUrl);
      resolve(dataUrl);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Get count of uploaded images
export function getUploadedImageCount(): number {
  return new Set(Array.from(memoryCache.values())).size;
}

// Clear all custom images
export async function clearAllCustomImages(): Promise<void> {
  memoryCache.clear();
  notifyListeners();
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch (e) {
    console.warn('Failed to clear IndexedDB:', e);
  }
}
