import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MANIFEST_PATH = path.join(UPLOAD_DIR, "manifest.json");

type Manifest = {
  hero: string | null;
  gallery: { id: number; src: string; caption: string }[];
};

async function readManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { hero: null, gallery: [] };
  }
}

async function writeManifest(manifest: Manifest) {
  if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

// GET — return current manifest
export async function GET() {
  const manifest = await readManifest();
  return NextResponse.json(manifest);
}

// POST — upload a file
export async function POST(req: NextRequest) {
  try {
    if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await req.formData();
    const type = formData.get("type") as string; // "hero" | "gallery"
    const file = formData.get("file") as File;
    const caption = (formData.get("caption") as string) || "";

    if (!file || !type) {
      return NextResponse.json({ error: "Missing file or type" }, { status: 400 });
    }

    // Sanitise filename and make it unique
    const ext = path.extname(file.name) || ".jpg";
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${type}_${base}_${Date.now()}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    const publicUrl = `/uploads/${filename}`;
    const manifest = await readManifest();

    if (type === "hero") {
      manifest.hero = publicUrl;
    } else {
      const id = Date.now();
      manifest.gallery.push({ id, src: publicUrl, caption });
    }

    await writeManifest(manifest);
    return NextResponse.json({ url: publicUrl, manifest });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// DELETE — remove a gallery image or clear hero
export async function DELETE(req: NextRequest) {
  try {
    const { type, id } = await req.json();
    const manifest = await readManifest();

    if (type === "hero") {
      manifest.hero = null;
    } else if (type === "gallery" && id !== undefined) {
      manifest.gallery = manifest.gallery.filter((g) => g.id !== id);
    }

    await writeManifest(manifest);
    return NextResponse.json({ manifest });
  } catch (err) {
    console.error("[delete]", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// PATCH — update a gallery image caption
export async function PATCH(req: NextRequest) {
  try {
    const { id, caption } = await req.json();
    const manifest = await readManifest();
    const item = manifest.gallery.find((g) => g.id === id);
    if (item) item.caption = caption;
    await writeManifest(manifest);
    return NextResponse.json({ manifest });
  } catch (err) {
    console.error("[patch]", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
