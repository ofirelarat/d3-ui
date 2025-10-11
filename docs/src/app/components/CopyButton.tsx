// apps/docs/app/components/CopyButton.tsx
"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
