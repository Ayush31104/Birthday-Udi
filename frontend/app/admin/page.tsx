"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type GalleryItem = { id: number; src: string; caption: string };
type Manifest = { hero: string | null; gallery: GalleryItem[] };

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ROSE = "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 50%, #D5A6A6 100%)";

function GradientText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        background: ROSE,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-medium shadow-warm-xl"
      style={{
        background: ok ? "rgba(200,90,90,0.92)" : "rgba(100,40,40,0.92)",
        color: "#fff",
        backdropFilter: "blur(12px)",
        fontFamily: "var(--font-inter)",
        letterSpacing: "0.02em",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {msg}
    </motion.div>
  );
}

// ─── Drop zone ────────────────────────────────────────────────────────────────
function DropZone({
  onFiles,
  multiple = false,
  label,
  sublabel,
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label: string;
  sublabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (valid.length) onFiles(valid);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
      className="relative flex flex-col items-center justify-center gap-2 rounded-2xl cursor-pointer transition-all duration-200"
      style={{
        border: `2px dashed ${dragging ? "#C85A5A" : "rgba(200,90,90,0.3)"}`,
        background: dragging ? "rgba(200,90,90,0.06)" : "rgba(250,246,241,0.6)",
        padding: "2rem 1.5rem",
        minHeight: "120px",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4V18M14 4L9 9M14 4L19 9" stroke="#C85A5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20V23C4 23.552 4.448 24 5 24H23C23.552 24 24 23.552 24 23V20" stroke="#C85A5A" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <p className="text-sm font-medium" style={{ color: "#7A4A5A", fontFamily: "var(--font-inter)" }}>
        {label}
      </p>
      {sublabel && (
        <p className="text-xs" style={{ color: "#A87A8A", fontFamily: "var(--font-inter)" }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}

// ─── Gallery card ─────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  onDelete,
  onCaptionSave,
  onReplace,
}: {
  item: GalleryItem;
  onDelete: () => void;
  onCaptionSave: (caption: string) => void;
  onReplace: (file: File) => void;
}) {
  const [caption, setCaption] = useState(item.caption);
  const [editing, setEditing] = useState(false);
  const replaceRef = useRef<HTMLInputElement>(null);

  const save = () => { onCaptionSave(caption); setEditing(false); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden shadow-warm"
      style={{
        background: "rgba(250,246,241,0.85)",
        border: "1px solid rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Image */}
      <div className="relative group" style={{ aspectRatio: "4/3", background: "linear-gradient(135deg,#FFE4E1,#FFC0CB)" }}>
        <img src={item.src} alt={item.caption || "Gallery"} className="w-full h-full object-cover" />
        {/* Overlay actions */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3"
          style={{ background: "rgba(61,31,45,0.55)", backdropFilter: "blur(4px)" }}
        >
          {/* Replace */}
          <button
            onClick={() => replaceRef.current?.click()}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ background: "rgba(212,175,151,0.9)", border: "1px solid rgba(255,255,255,0.4)" }}
            title="Replace image"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 7.5C2 4.462 4.462 2 7.5 2C9.5 2 11.25 3 12.25 4.5M13 7.5C13 10.538 10.538 13 7.5 13C5.5 13 3.75 12 2.75 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 2L13 4.5L10.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 13L2 10.5L4.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Delete */}
          <button
            onClick={onDelete}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ background: "rgba(200,90,90,0.9)", border: "1px solid rgba(255,255,255,0.4)" }}
            title="Remove image"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 2L11 11M11 2L2 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <input
          ref={replaceRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onReplace(f); }}
        />
      </div>

      {/* Caption */}
      <div className="p-3">
        {editing ? (
          <div className="flex gap-2">
            <input
              autoFocus
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }}
              className="flex-1 text-xs rounded-lg px-2 py-1.5 outline-none"
              style={{
                background: "rgba(255,228,225,0.6)",
                border: "1px solid rgba(200,90,90,0.3)",
                color: "#7A4A5A",
                fontFamily: "var(--font-lora)",
                fontStyle: "italic",
              }}
              placeholder="Add a caption…"
            />
            <button
              onClick={save}
              className="text-xs px-2 py-1 rounded-lg"
              style={{ background: "rgba(200,90,90,0.15)", color: "#C85A5A", fontFamily: "var(--font-inter)" }}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full text-left text-xs truncate transition-colors hover:opacity-70"
            style={{
              color: caption ? "#7A4A5A" : "#C0A0A8",
              fontFamily: "var(--font-lora)",
              fontStyle: "italic",
            }}
          >
            {caption || "＋ Add caption…"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [manifest, setManifest] = useState<Manifest>({ hero: null, gallery: [] });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load manifest on mount
  useEffect(() => {
    fetch("/api/images")
      .then((r) => r.json())
      .then((m) => { setManifest(m); setLoading(false); })
      .catch(() => { setLoading(false); showToast("Could not load images", false); });
  }, [showToast]);

  // ── Upload hero ──────────────────────────────────────────────────────────────
  const uploadHero = async (files: File[]) => {
    const file = files[0];
    setUploading(true);
    const fd = new FormData();
    fd.append("type", "hero");
    fd.append("file", file);
    try {
      const res = await fetch("/api/images", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setManifest(data.manifest);
      showToast("Hero image updated ✓");
    } catch {
      showToast("Upload failed", false);
    } finally {
      setUploading(false);
    }
  };

  // ── Upload gallery images ────────────────────────────────────────────────────
  const uploadGallery = async (files: File[]) => {
    setUploading(true);
    try {
      let latest = manifest;
      for (const file of files) {
        const fd = new FormData();
        fd.append("type", "gallery");
        fd.append("file", file);
        const res = await fetch("/api/images", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        latest = data.manifest;
      }
      setManifest(latest);
      showToast(`${files.length} photo${files.length > 1 ? "s" : ""} added ✓`);
    } catch {
      showToast("Upload failed", false);
    } finally {
      setUploading(false);
    }
  };

  // ── Replace gallery image ────────────────────────────────────────────────────
  const replaceGallery = async (id: number, file: File) => {
    setUploading(true);
    // Delete old entry, upload new one
    try {
      await fetch("/api/images", { method: "DELETE", body: JSON.stringify({ type: "gallery", id }), headers: { "Content-Type": "application/json" } });
      const fd = new FormData();
      fd.append("type", "gallery");
      fd.append("file", file);
      const res = await fetch("/api/images", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setManifest(data.manifest);
      showToast("Image replaced ✓");
    } catch {
      showToast("Replace failed", false);
    } finally {
      setUploading(false);
    }
  };

  // ── Delete gallery image ─────────────────────────────────────────────────────
  const deleteGallery = async (id: number) => {
    try {
      const res = await fetch("/api/images", { method: "DELETE", body: JSON.stringify({ type: "gallery", id }), headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      setManifest(data.manifest);
      showToast("Image removed");
    } catch {
      showToast("Remove failed", false);
    }
  };

  // ── Update caption ───────────────────────────────────────────────────────────
  const updateCaption = async (id: number, caption: string) => {
    try {
      const res = await fetch("/api/images", { method: "PATCH", body: JSON.stringify({ id, caption }), headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      setManifest(data.manifest);
    } catch {
      showToast("Caption save failed", false);
    }
  };

  // ── Clear hero ───────────────────────────────────────────────────────────────
  const clearHero = async () => {
    try {
      const res = await fetch("/api/images", { method: "DELETE", body: JSON.stringify({ type: "hero" }), headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      setManifest(data.manifest);
      showToast("Hero image removed");
    } catch {
      showToast("Remove failed", false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #FAF6F1 0%, #FFE4E1 30%, #FFC0CB 60%, #F7E7CE 100%)",
        backgroundSize: "300% 300%",
        animation: "warmGradient 16s ease infinite",
      }}
    >
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,192,203,0.4) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(247,231,206,0.5) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.38em] uppercase mb-3" style={{ color: "#A87A8A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            Behind the Scenes
          </p>
          <h1
            className="text-4xl sm:text-5xl font-semibold italic mb-3"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            <GradientText>Image Manager</GradientText>
          </h1>
          <p className="text-sm" style={{ color: "#A87A8A", fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
            Upload, replace, and manage all photos — no code needed.
          </p>
          <div className="flex items-center gap-3 w-full max-w-xs mx-auto mt-6">
            <div className="divider-warm flex-1" />
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0L10 5L5 10L0 5Z" fill="#D4AF97" opacity="0.8" /></svg>
            <div className="divider-warm flex-1" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div
              className="w-8 h-8 rounded-full border-2"
              style={{ borderColor: "#C85A5A", borderTopColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-10">

            {/* ── Hero Image ─────────────────────────────────────────────────── */}
            <section
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: "rgba(250,246,241,0.78)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 16px 56px rgba(200,90,90,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#C85A5A,#FF7F9B)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="5" r="3" stroke="white" strokeWidth="1.4" />
                    <path d="M2 12C2 9.791 4.239 8 7 8C9.761 8 12 9.791 12 12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: "#7A4A5A", fontFamily: "var(--font-playfair)" }}>
                    Hero Profile Photo
                  </h2>
                  <p className="text-xs" style={{ color: "#A87A8A", fontFamily: "var(--font-inter)" }}>
                    The circular photo shown at the top of the birthday page
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Preview */}
                <div className="shrink-0">
                  <div
                    className="w-32 h-32 rounded-full overflow-hidden"
                    style={{
                      border: "3px solid rgba(212,175,151,0.7)",
                      boxShadow: "0 0 0 6px rgba(255,192,203,0.2), 0 12px 40px rgba(200,90,90,0.2)",
                      background: "linear-gradient(135deg,#FFE4E1,#FFC0CB,#D5A6A6)",
                    }}
                  >
                    {manifest.hero ? (
                      <img src={manifest.hero} alt="Hero" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🌸</div>
                    )}
                  </div>
                  {manifest.hero && (
                    <button
                      onClick={clearHero}
                      className="mt-2 w-full text-xs text-center transition-opacity hover:opacity-70"
                      style={{ color: "#C85A5A", fontFamily: "var(--font-inter)" }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Drop zone */}
                <div className="flex-1 w-full">
                  <DropZone
                    onFiles={uploadHero}
                    label={manifest.hero ? "Drop a new photo to replace" : "Drop your photo here"}
                    sublabel="JPG, PNG, WEBP — any size"
                  />
                </div>
              </div>
            </section>

            {/* ── Gallery Images ─────────────────────────────────────────────── */}
            <section
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: "rgba(250,246,241,0.78)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 16px 56px rgba(200,90,90,0.12)",
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#C85A5A,#FF7F9B)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                      <rect x="8" y="1" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                      <rect x="1" y="8" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                      <rect x="8" y="8" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: "#7A4A5A", fontFamily: "var(--font-playfair)" }}>
                      Gallery Photos
                    </h2>
                    <p className="text-xs" style={{ color: "#A87A8A", fontFamily: "var(--font-inter)" }}>
                      {manifest.gallery.length} photo{manifest.gallery.length !== 1 ? "s" : ""} · hover a photo to replace or remove it
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "rgba(200,90,90,0.1)", color: "#C85A5A", fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  {manifest.gallery.length} / ∞
                </span>
              </div>

              {/* Upload zone */}
              <DropZone
                onFiles={uploadGallery}
                multiple
                label="Drop photos here or click to browse"
                sublabel="Select multiple photos at once — they'll appear instantly"
              />

              {/* Grid */}
              {manifest.gallery.length > 0 && (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6"
                >
                  <AnimatePresence>
                    {manifest.gallery.map((item) => (
                      <GalleryCard
                        key={item.id}
                        item={item}
                        onDelete={() => deleteGallery(item.id)}
                        onCaptionSave={(cap) => updateCaption(item.id, cap)}
                        onReplace={(file) => replaceGallery(item.id, file)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {manifest.gallery.length === 0 && (
                <div className="text-center py-8 mt-4">
                  <p className="text-sm" style={{ color: "#C0A0A8", fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
                    No photos yet — upload some above to get started.
                  </p>
                </div>
              )}
            </section>

            {/* ── Live preview link ──────────────────────────────────────────── */}
            <div className="text-center pb-4">
              <a
                href="/surprise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm text-white transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #C85A5A 0%, #A85555 100%)",
                  boxShadow: "0 8px 28px rgba(200,90,90,0.35)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 7L7 13M1 7H13" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Preview Birthday Page
              </a>
              <p className="mt-2 text-xs" style={{ color: "#A87A8A", fontFamily: "var(--font-inter)" }}>
                Opens in a new tab — changes appear immediately
              </p>
            </div>

          </div>
        )}

        {/* Uploading overlay */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center"
              style={{ background: "rgba(250,246,241,0.6)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-10 h-10 rounded-full border-2"
                  style={{ borderColor: "#C85A5A", borderTopColor: "transparent" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-sm" style={{ color: "#7A4A5A", fontFamily: "var(--font-inter)", fontWeight: 500 }}>
                  Uploading…
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast */}
        <AnimatePresence>
          {toast && <Toast msg={toast.msg} ok={toast.ok} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
