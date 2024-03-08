"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCE() {
  return (
    <Editor
      apiKey="vyenxsgxizwl87r8m4c0go5lb3gy230oeyynz0vuyud37cx1"
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}
