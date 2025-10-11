// apps/docs/app/components/CodeBlock.tsx
"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative bg-gray-900 text-gray-100 rounded-md p-4 mb-6">
      <pre className="text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}
