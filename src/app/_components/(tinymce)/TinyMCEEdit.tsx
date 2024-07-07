"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { api } from "~/trpc/react";
import type { DisplayType } from "~/type";

export default function TinyMCEEdit({
  data,
  modById,
}: {
  data: DisplayType;
  modById: string;
}) {
  const oriData = data;
  const [postContent, setPostContent] = useState({
    postId: data!.id,
    title: data!.title,
    summary: data!.summary,
    content: data!.content,
    createdById: data!.createdBy.id,
    ori_title: oriData!.title,
    ori_summary: oriData!.summary,
    ori_content: oriData!.content,
    modById: modById,
    eso: data?.permissions?.eso ?? false,
    ffxiv: data?.permissions?.ffxiv ?? false,
    swtor: data?.permissions?.swtor ?? false,
    general: data?.permissions?.general ?? false,
    staff: data?.permissions?.staff ?? false,
    raid: data?.permissions?.raid ?? false,
    officer: data?.permissions?.officer ?? false,
    guild_public: data?.permissions?.guild_public ?? false,
    member: data?.permissions?.member ?? false,
    beginner: data?.permissions?.beginner ?? false,
    intermediate: data?.permissions?.intermediate ?? false,
    advanced: data?.permissions?.advanced ?? false,
    type: data?.permissions?.type ?? "article",
    published: true,
    priv: data?.permissions?.officer
      ? "officer"
      : data?.permissions?.guild_public
        ? "guild_public"
        : data?.permissions?.staff
          ? "staff"
          : "general",
    game: data?.permissions?.eso
      ? "eso"
      : data?.permissions?.ffxiv
        ? "ffxiv"
        : data?.permissions?.swtor
          ? "swtor"
          : "member",
    aud: data?.permissions?.beginner
      ? "beginner"
      : data?.permissions?.intermediate
        ? "intermediate"
        : "advanced",
  });

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [dirty, setDirty] = useState(false);

  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostContent({ ...postContent, [name]: value });
    setDirty(true);
  }

  const post = api.put.updatePost.useMutation({
    onSuccess: () => {
      alert("Modified Post Published!");
      location.reload();
    },
  });

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      postContent.content = content;
      setDirty(false);
      editorRef.current.setDirty(false);
      post.mutate(postContent);
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
        <br />
        {/* THIS IS THE CONTENT TYPE BLOCK */}
        <label htmlFor="type" className="con_type">
          Content Type:
        </label>
        <div id="type" className="con_type">
          <input
            type="radio"
            id="article_type"
            name="type"
            value="article"
            checked={postContent.type === "article"}
            onChange={() => setPostContent({ ...postContent, type: "article" })}
          />
          <label htmlFor="article_type">Article</label>
          <br />
          <input
            type="radio"
            id="guide_type"
            name="type"
            value="guide"
            checked={postContent.type === "guide"}
            onChange={() => setPostContent({ ...postContent, type: "guide" })}
          />
          <label htmlFor="guide_type">Guide</label>
          <br />

          <input
            type="radio"
            id="build_type"
            name="type"
            value="build"
            checked={postContent.type === "build"}
            onChange={() => setPostContent({ ...postContent, type: "build" })}
          />
          <label htmlFor="build_type">Build</label>
          <br />
          <input
            type="radio"
            id="policy_type"
            name="type"
            value="policy"
            checked={postContent.type === "policy"}
            onChange={() => setPostContent({ ...postContent, type: "policy" })}
          />
          <label htmlFor="policy_type">Policy</label>
          <br />
        </div>
        {/* THIS IS THE ACCESS PRIVILEGES BLOCK */}
        <label htmlFor="accessPrivileges" className="accessPrivileges">
          Access Privileges:
        </label>
        <div className="accessPrivileges">
          <input
            type="radio"
            id="general_type"
            name="priv"
            value="general"
            checked={postContent.priv === "general"}
            onChange={() => setPostContent({ ...postContent, priv: "general" })}
          />
          <label htmlFor="general_type">Guild Members</label>
          <br />
          <input
            type="radio"
            id="public_type"
            name="priv"
            value="public"
            checked={postContent.priv === "guild_public"}
            onChange={() =>
              setPostContent({ ...postContent, priv: "guild_public" })
            }
          />
          <label htmlFor="public_type">Public Post</label>
          <br />

          <input
            type="radio"
            id="staff_type"
            name="priv"
            value="staff"
            checked={postContent.priv === "officer"}
            onChange={() => setPostContent({ ...postContent, priv: "officer" })}
          />
          <label htmlFor="staff_type">Officer (for a specific game)</label>
          <br />
          <input
            type="radio"
            id="staff+_type"
            name="priv"
            value="staff+"
            checked={postContent.priv === "staff"}
            onChange={() => setPostContent({ ...postContent, priv: "staff" })}
          />
          <label htmlFor="staff+_type">Staff</label>
          <br />
        </div>
        {/* THIS IS THE GAME SELECTION BLOCK */}
        <label htmlFor="Category" className="Category">
          Game:
        </label>
        <div className="Category">
          <input
            type="radio"
            id="Other"
            name="game"
            value="member"
            checked={postContent.game === "member"}
            onChange={() => setPostContent({ ...postContent, game: "member" })}
          />
          <label htmlFor="Other">General Guild Members</label>
          <br />
          <input
            type="radio"
            id="ESO"
            name="game"
            value="eso"
            checked={postContent.game === "eso"}
            onChange={() => setPostContent({ ...postContent, game: "eso" })}
          />
          <label htmlFor="ESO">ESO</label>
          <br />
          <input
            type="radio"
            id="FFXIV"
            name="game"
            value="ffxiv"
            checked={postContent.game === "ffxiv"}
            onChange={() => setPostContent({ ...postContent, game: "ffxiv" })}
          />
          <label htmlFor="FFXIV">FFXIV</label>
          <br />
          <input
            type="radio"
            id="SWTOR"
            name="game"
            value="swtor"
            checked={postContent.game === "swtor"}
            onChange={() => setPostContent({ ...postContent, game: "swtor" })}
          />
          <label htmlFor="SWTOR">SWTOR</label>
          <br />
        </div>
        {/* THIS IS THE AUDIENCE BLOCK */}
        <label htmlFor="audience" className="audience">
          Audience:
        </label>
        <div className="audience">
          <input
            type="radio"
            id="Beg"
            name="aud"
            value="beginner"
            checked={postContent.aud === "beginner"}
            onChange={() => setPostContent({ ...postContent, aud: "beginner" })}
          />
          <label htmlFor="Beg">Beginner</label>
          <br />
          <input
            type="radio"
            id="Int"
            name="aud"
            value="intermediate"
            checked={postContent.aud === "intermediate"}
            onChange={() =>
              setPostContent({ ...postContent, aud: "intermediate" })
            }
          />
          <label htmlFor="Int">Intermediate</label>
          <br />
          <input
            type="radio"
            id="Adv"
            name="aud"
            value="advanced"
            checked={postContent.aud === "advanced"}
            onChange={() => setPostContent({ ...postContent, aud: "advanced" })}
          />
          <label htmlFor="Adv">Advanced</label>
          <br />
        </div>

        <label htmlFor="summary">Summary:</label>
        <input
          type="text"
          name="summary"
          value={postContent.summary}
          required
          onChange={handleChangeText}
        />
        <br />

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="vyenxsgxizwl87r8m4c0go5lb3gy230oeyynz0vuyud37cx1"
          value={postContent.content}
          onEditorChange={(content) => {
            setPostContent({ ...postContent, content });
            setDirty(true);
          }}
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
          Publish Modified Post
        </button>

        {dirty && <p>Submit when ready!</p>}
      </form>
    </div>
  );
}
