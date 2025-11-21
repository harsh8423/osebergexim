'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-quill-new to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function QuillEditor({ value, onChange, placeholder }) {
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border border-[#A7B5C6] rounded-lg p-4 min-h-[300px] sm:min-h-[400px] bg-white">
        <p className="text-sm sm:text-base text-[#5D7183]">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="quill-editor-wrapper">
      <style jsx global>{`
        .quill-editor-wrapper .ql-toolbar {
          padding: 8px;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .quill-editor-wrapper .ql-container {
          min-height: 300px;
          font-size: 14px;
        }
        @media (min-width: 640px) {
          .quill-editor-wrapper .ql-container {
            min-height: 400px;
            font-size: 16px;
          }
        }
        .quill-editor-wrapper .ql-toolbar .ql-formats {
          margin-right: 8px;
        }
        .quill-editor-wrapper .ql-toolbar button {
          width: 28px;
          height: 28px;
          padding: 4px;
        }
        @media (min-width: 640px) {
          .quill-editor-wrapper .ql-toolbar button {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            ['clean'],
          ],
        }}
        style={{ minHeight: '300px' }}
        className="sm:min-h-[400px]"
      />
    </div>
  );
}

