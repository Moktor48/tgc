"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  postContent: {
    post: string;
    title: string;
    published: boolean;
    id: string;
    createdBy: {
      name: string;
      id: string;
    };
    permissions: {
      eso: boolean;
      ffxiv: boolean;
      swtor: boolean;
      general: boolean;
    }[];
  };
}

export default function DisplayPost({ postContent }: Props) {
  const editable = false;
  const editor = useEditor({
    editable,
    content: postContent.post,
    extensions: [StarterKit],
  });
  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(false);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }
  return <EditorContent editor={editor} />;
}
