import { ToolMeta } from "./types";

export const TOOLS: ToolMeta[] = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    tagline: "Stack pages into one file",
    description:
      "Combine multiple PDFs into a single document. Drag to reorder before you merge.",
    category: "organize",
    accent: "teal",
    icon: "Layers",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    tagline: "Pull pages apart",
    description:
      "Break a PDF into page ranges, or export every page as its own file.",
    category: "organize",
    accent: "teal",
    icon: "Scissors",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    tagline: "Make it editable",
    description:
      "Turn a PDF — scanned or text-based — into an editable .docx file.",
    category: "convert",
    accent: "teal",
    icon: "FileText",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    tagline: "Lock it in place",
    description: "Convert a .docx or .doc file into a shareable PDF.",
    category: "convert",
    accent: "teal",
    icon: "FileOutput",
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    tagline: "Pages from pictures",
    description:
      "Turn one or several JPG, PNG or WEBP images into a single PDF.",
    category: "convert",
    accent: "teal",
    icon: "ImagePlus",
  },
  {
    slug: "image-to-word",
    name: "Image to Word",
    tagline: "Scan to document",
    description:
      "Extract text from an image with OCR and generate an editable .docx.",
    category: "extract",
    accent: "teal",
    icon: "ScanText",
  },
  {
    slug: "image-to-text",
    name: "Image to Text",
    tagline: "Just the words",
    description:
      "Pull plain text out of an image — copy it or download it as .txt.",
    category: "extract",
    accent: "teal",
    icon: "TextSelect",
  },
];

export const CATEGORY_LABEL: Record<string, string> = {
  organize: "Organize",
  convert: "Convert",
  extract: "Extract",
};

export const CATEGORY_NOTE: Record<string, string> = {
  organize: "Reshape a PDF's pages — put them together or take them apart.",
  convert: "Move content between file formats without losing the layout.",
  extract: "Pull the text out of an image so you can actually use it.",
};

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}