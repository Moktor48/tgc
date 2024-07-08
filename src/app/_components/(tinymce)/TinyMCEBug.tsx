"use client";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { api } from "~/trpc/react";

export default function TinyMCEBUG({ id }: { id: string }) {
  const initialValue = "<p>FEED ME YOUR BUGS!!!!!!!!! (and suggestions)</p>";
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);

  //Functions should be made to replace the php
  const [postContent, setPostContent] = useState({
    title: "==> SET TITLE <==",
    content: "",
    createdById: id,
  });

  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostContent({ ...postContent, [name]: value });
    setDirty(true);
  }

  const postBug = api.post.bug.useMutation({
    onSuccess: () => {
      alert("Offering Received!");
      location.href = `/dashboard/${id}`;
    },
  });

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      postContent.content = content;
      setDirty(false);
      editorRef.current.setDirty(false);
      postBug.mutate(postContent);
    }
  };

  return (
    <div>
      <form>
        {/* THIS IS THE TITLE BLOCK */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={postContent.title}
          required
          onChange={handleChangeText}
        />

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="vyenxsgxizwl87r8m4c0go5lb3gy230oeyynz0vuyud37cx1"
          init={{
            height: 300,
            plugins:
              "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | hr | image",
          }}
        />
        <button
          className={`button-40 ${!dirty ? "text-red-500" : "text-green-500"}`}
          onClick={save}
          disabled={!dirty}
        >
          Feeeeeed me, Seymour!
        </button>
      </form>
    </div>
  );
}
