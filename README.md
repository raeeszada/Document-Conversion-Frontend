# Foldr — PDF & Document Toolkit (Frontend)

A Next.js 14 + TypeScript + Tailwind frontend for a document-processing
toolkit: merge, split, and convert between PDF, Word and image files, plus
OCR-based text extraction (English, Urdu, Arabic).

This is **frontend only**. It calls the FastAPI backend you already have
running — no backend code is included here.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark theme by default)
- Axios for API calls, with upload progress
- lucide-react icons, pdf-lib (client-side PDF page-count preview)

## Setup

```bash
npm install
cp .env.local.example .env.local
# edit .env.local and point NEXT_PUBLIC_API_BASE_URL at your FastAPI server
npm run dev
```

Open http://localhost:3000.

## Backend contract expected

| Route | Method | Body (multipart/form-data) | Response |
|---|---|---|---|
| `/merge-pdf` | POST | `files[]` | `{ download_url }` |
| `/split-pdf` | POST | `file`, `mode` (`range`\|`every-page`), `ranges?` | `{ download_url }` |
| `/pdf-to-word` | POST | `file` | `{ download_url }` |
| `/word-to-pdf` | POST | `file` | `{ download_url }` |
| `/image-to-pdf` | POST | `files[]` | `{ download_url }` |
| `/image-to-word` | POST | `file`, `language` (`eng`\|`urd`\|`ara`) | `{ download_url }` |
| `/image-to-text` | POST | `file`, `language` (`eng`\|`urd`\|`ara`) | `{ text }` |

If `download_url` is a relative path (e.g. `/files/out.pdf`), it's resolved
against `NEXT_PUBLIC_API_BASE_URL` automatically (see `lib/api.ts`). If your
backend already returns absolute URLs, no changes are needed.

## Project structure

```
app/
  page.tsx                 landing page (hero + tool grid)
  merge-pdf/page.tsx
  split-pdf/page.tsx
  pdf-to-word/page.tsx
  word-to-pdf/page.tsx
  image-to-pdf/page.tsx
  image-to-word/page.tsx
  image-to-text/page.tsx
  layout.tsx, globals.css, not-found.tsx
components/
  FileDropzone.tsx          drag & drop + validation + reorder
  ProgressBar.tsx, Spinner.tsx, ToastMessage.tsx, DownloadButton.tsx
  ResultPanel.tsx, SubmitButton.tsx, LanguageSelect.tsx
  Navbar.tsx, Footer.tsx, ToolCard.tsx, PageHeader.tsx, BackgroundGlow.tsx
lib/
  api.ts     axios calls for every endpoint
  tools.ts   tool metadata (name, description, icon, category)
  types.ts, utils.ts
```

## Notes

- File validation (type + size) happens client-side in `FileDropzone` before
  any request is sent.
- Split PDF reads the page count in the browser via `pdf-lib` — no extra
  backend call needed for the page-count preview.
- Image to Text renders the extracted string directly (copy button +
  client-generated `.txt` download); every other tool downloads the file
  the backend returns.
- Swap the palette in `tailwind.config.ts` (`amber` / `teal` tokens) if you
  want a different accent scheme — everything reads from those tokens.
