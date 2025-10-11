"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, Code2 } from "lucide-react";
import { cn } from "../lib/utils";

interface CodeBlockProps {
  code: string;
  title?: string;
  defaultExpanded?: boolean;
}

export function CodeBlock({
  code,
  title,
  defaultExpanded = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative w-full rounded-lg border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-gray-400" />
          {title && <span className="text-sm text-gray-400">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-300 transition"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-300 transition"
          >
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform",
                isExpanded ? "transform rotate-0" : "transform rotate-180"
              )}
            />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-200",
          isExpanded ? "block" : "hidden"
        )}
      >
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-100">{code}</code>
        </pre>
      </div>
    </div>
  );
}
