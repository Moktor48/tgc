"use client";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { api } from "~/trpc/react";
type FormData = {
  eso: boolean;
  ffxiv: boolean;
  swtor: boolean;
  general: boolean;
  staff: boolean;
  raid: boolean;
  officer: boolean;
  guild_public: boolean;
  member: boolean;
  beginner: boolean;
  intermediate: boolean;
  advanced: boolean;
  type: string;
};
export default function TinyMCE({ id }: { id: string }) {
  const initialValue = "<p>Initial Content</p>";
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);

  //Functions should be made to replace the php
  const [postContent, setPostContent] = useState({
    title: "==> SET TITLE <==",
    summary: "==> SET SUMMARY <==",
    content: "",
    createdById: id,
  });

  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostContent({ ...postContent, [name]: value });
    setDirty(true);
  }
  const [permissionData, setPermissionData] = useState<FormData>({
    eso: false,
    ffxiv: false,
    swtor: false,
    general: false,
    staff: false,
    raid: false,
    officer: false,
    guild_public: false,
    member: false,
    beginner: false,
    intermediate: false,
    advanced: false,
    type: "article",
  });

  const [perm, setPerm] = useState({
    priv: "general",
    game: "member",
    aud: "",
  });

  const postPermissions = api.post.postPermissions.useMutation();

  const post = api.post.post.useMutation({
    onSuccess: (data) => {
      const postId = data.id;
      const PD = { ...permissionData, postId };
      postPermissions.mutate(PD);
      alert("Post Submitted!");
      location.reload();
    },
  });

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      postContent.content = content;
      console.log(content);
      setDirty(false);
      editorRef.current.setDirty(false);
      post.mutate(postContent);
      const priv = perm.priv;
      const game = perm.game;
      const aud = perm.aud;
      setPermissionData((prevState) => ({
        ...prevState,
        [priv]: true,
        [game]: true,
        [aud]: true,
      }));
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
            checked={permissionData.type === "article"}
            onChange={() =>
              setPermissionData({ ...permissionData, type: "article" })
            }
          />
          <label htmlFor="article_type">Article</label>
          <br />
          <input
            type="radio"
            id="guide_type"
            name="type"
            value="guide"
            checked={permissionData.type === "guide"}
            onChange={() =>
              setPermissionData({ ...permissionData, type: "guide" })
            }
          />
          <label htmlFor="guide_type">Guide</label>
          <br />

          <input
            type="radio"
            id="build_type"
            name="type"
            value="build"
            checked={permissionData.type === "build"}
            onChange={() =>
              setPermissionData({ ...permissionData, type: "build" })
            }
          />
          <label htmlFor="build_type">Build</label>
          <br />
          <input
            type="radio"
            id="policy_type"
            name="type"
            value="policy"
            checked={permissionData.type === "policy"}
            onChange={() =>
              setPermissionData({ ...permissionData, type: "policy" })
            }
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
            checked={perm.priv === "general"}
            onChange={() => setPerm({ ...perm, priv: "general" })}
          />
          <label htmlFor="general_type">Guild Members</label>
          <br />
          <input
            type="radio"
            id="public_type"
            name="priv"
            value="public"
            checked={perm.priv === "guild_public"}
            onChange={() => setPerm({ ...perm, priv: "guild_public" })}
          />
          <label htmlFor="public_type">Public Post</label>
          <br />

          <input
            type="radio"
            id="staff_type"
            name="priv"
            value="staff"
            checked={perm.priv === "officer"}
            onChange={() => setPerm({ ...perm, priv: "officer" })}
          />
          <label htmlFor="staff_type">Officer (for a specific game)</label>
          <br />
          <input
            type="radio"
            id="staff+_type"
            name="priv"
            value="staff+"
            checked={perm.priv === "staff"}
            onChange={() => setPerm({ ...perm, priv: "staff" })}
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
            checked={perm.game === "member"}
            onChange={() => setPerm({ ...perm, game: "member" })}
          />
          <label htmlFor="Other">General Guild Members</label>
          <br />
          <input
            type="radio"
            id="ESO"
            name="game"
            value="eso"
            checked={perm.game === "eso"}
            onChange={() => setPerm({ ...perm, game: "eso" })}
          />
          <label htmlFor="ESO">ESO</label>
          <br />
          <input
            type="radio"
            id="FFXIV"
            name="game"
            value="ffxiv"
            checked={perm.game === "ffxiv"}
            onChange={() => setPerm({ ...perm, game: "ffxiv" })}
          />
          <label htmlFor="FFXIV">FFXIV</label>
          <br />
          <input
            type="radio"
            id="SWTOR"
            name="game"
            value="swtor"
            checked={perm.game === "swtor"}
            onChange={() => setPerm({ ...perm, game: "swtor" })}
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
            checked={perm.aud === "beginner"}
            onChange={() => setPerm({ ...perm, aud: "beginner" })}
          />
          <label htmlFor="Beg">Beginner</label>
          <br />
          <input
            type="radio"
            id="Int"
            name="aud"
            value="intermediate"
            checked={perm.aud === "intermediate"}
            onChange={() => setPerm({ ...perm, aud: "intermediate" })}
          />
          <label htmlFor="Int">Intermediate</label>
          <br />
          <input
            type="radio"
            id="Adv"
            name="aud"
            value="advanced"
            checked={perm.aud === "advanced"}
            onChange={() => setPerm({ ...perm, aud: "advanced" })}
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
          Submit!
        </button>

        {dirty && <p>Submit when ready!</p>}
      </form>
    </div>
  );
}
