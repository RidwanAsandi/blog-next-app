"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const TiptapEditor = ({
  description,
  setDescription,
  clearTrigger,
  onClearDone,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && clearTrigger) {
      editor.commands.setContent(""); // ✅ Clear content
      onClearDone(); // notify parent clear done
    }
  }, [clearTrigger]);

  if (!editor) return null;

  return (
    <div className="border mt-4 p-4 rounded">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("bold") ? "bg-black text-white" : ""
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("italic") ? "bg-black text-white" : ""
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("strike") ? "bg-black text-white" : ""
          }`}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("bulletList") ? "bg-black text-white" : ""
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("paragraph") ? "bg-black text-white" : ""
          }`}
        >
          Normal
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 py-1 border rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-black text-white"
              : ""
          }`}
        >
          H2
        </button>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] border p-2 rounded"
        required
      />
    </div>
  );
};

export default TiptapEditor;
