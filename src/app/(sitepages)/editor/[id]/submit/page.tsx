//Page for actual editor, editor will submit post data to include the game and audience.
"use client";
import React, { useState } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useCurrentEditor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { BubbleMenu } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react";
type FormData = {
  eso: boolean;
  ffxiv: boolean;
  swtor: boolean;
  general: boolean;
  staff: boolean;
  raid: boolean;
  officer: boolean;
  type: string;
};

const article = `<p><strong>Test Template ARTICLE!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`;
const build = `<p><strong>Test Template BUILD!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`;
const guide = `<p><strong>Test Template GUIDE!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`;
const notification = `<p><strong>Test Template NOTIFICATION!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`;
const report = `<p><strong>Test Template REPORT!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`;
const suggest = `<p><strong>SUGGESTIONS!!!</strong></p><p>Add information for functionality, bugs, or general suggestions</p><p></p><p>I also need templates made for the types, so a build template, article template, etc.</p><h2></h2>`;

export default function PostSubmit() {
  const { data } = useSession();
  const session = data;
  if (!session)
    return (
      <p className="text-3xl text-white">
        You must be logged in to view this page
      </p>
    );
  if (session.user.role != "staff")
    return (
      <p className="text-3xl text-white">
        You are not authorized to view this page
      </p>
    );
  const userId = session.user.id;
  const searchParams = useSearchParams();

  //These will set GAME, TYPE of document, and ROLE the document is intended for.
  const [publicPost, setPublicPost] = useState(false);
  const gameSelect = searchParams.get("game")!;
  const typeSelect = searchParams.get("type")!;
  const roleSelect = searchParams.get("role")!;
  const [title, setTitle] = useState({ title: "==> SET TITLE <==" });

  const postTemplate =
    typeSelect === "1"
      ? build
      : typeSelect === "2"
        ? guide
        : typeSelect === "3"
          ? notification
          : typeSelect === "4"
            ? report
            : typeSelect === "5"
              ? suggest
              : typeSelect === "6"
                ? article
                : "Not a valid type";
  const typeString =
    typeSelect === "1"
      ? "build"
      : typeSelect === "2"
        ? "guide"
        : typeSelect === "3"
          ? "notification"
          : typeSelect === "4"
            ? "report"
            : typeSelect === "5"
              ? "suggestion"
              : "article";

  //Permission data is set through the previous page set-up
  const [permissionData, setPermissionData] = useState<FormData>({
    eso: false,
    ffxiv: false,
    swtor: false,
    general: false,
    staff: false,
    raid: false,
    officer: false,
    type: typeString,
  });
  //Function to submit the permission data
  const subPerm = api.post.postPermissions.useMutation();

  //Function to submit the post data, then on response adds permissions to the post_permission table
  const subData = api.post.post.useMutation({
    onSuccess(data) {
      const id = data.id;
      const pId = { postId: id };
      const publik = { guild_public: publicPost };
      console.log(publik);
      const permissionDataX = {
        ...permissionData,
        ...pId,
        ...publik,
      };
      console.log(permissionDataX);
      if (!data.id) return null;
      subPerm.mutate(permissionDataX);
      alert("Post submitted!");
      location.assign(`/editor/${userId}`);
    },
  });
  const handleChange = () => {
    setPublicPost(!publicPost);
    console.log(publicPost);
  };

  function handleChangeT(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle((prev) => {
      return { ...prev, title: e.target.value };
    });
  }

  // MenuBar START =====================> Watch placement of elements!!!
  const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) return null;

    async function submit() {
      setPermissionData({
        ...permissionData,
        [gameSelect]: true,
        [roleSelect]: true,
      });
      if (!editor) return null;
      if (title.title === "==> SET TITLE <==") return alert("set title");
      console.log(title);
      const content = editor.getHTML();
      if (content === postTemplate) return alert("Fill out the content!");
      subData.mutate({
        createdById: userId,
        post: content,
        title: title.title,
      });
    }

    return (
      <div className="menu-bar">
        {/*Bubble Menu components */}
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <input
              type="color"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              onInput={(event) =>
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLButtonElement).value)
                  .run()
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold") ? "is-active border-yellow-500" : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`${
                editor.isActive("italic") ? "is-active border-yellow-500" : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={`${
                editor.isActive("strike") ? "is-active border-yellow-500" : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              strike
            </button>
          </BubbleMenu>
        )}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`${
            editor.isActive("code") ? "is-active border-yellow-500" : ""
          } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
        >
          code
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
        >
          clear marks
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
        >
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${
            editor.isActive("paragraph") ? "is-active border-yellow-500" : ""
          } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
        >
          paragraph
        </button>
        {/*Floating Menu components */}
        {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 1 })
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              h1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 2 })
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              h2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 3 })
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              h3
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${
                editor.isActive("bulletList")
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              bullet list
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${
                editor.isActive("orderedList")
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              ordered list
            </button>
          </FloatingMenu>
        )}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${
            editor.isActive("codeBlock") ? "is-active border-yellow-500" : ""
          } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
        >
          code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${
            editor.isActive("blockquote") ? "is-active border-yellow-500" : ""
          } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
        >
          blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
        >
          horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
        >
          hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </button>

        <button
          onClick={submit}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-red-500 bg-gradient-to-t from-red-400 via-red-600 to-red-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2"
        >
          Submit
        </button>
      </div>
    );
  };

  // MenuBar END =====================> Watch placement of elements!!!

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  return (
    <div className="bg-black">
      <h1>
        Template to create: Type: {typeString.toUpperCase()}; Audience:{" "}
        {roleSelect.toUpperCase()}; Game: {gameSelect.toUpperCase()}{" "}
      </h1>
      <form>
        <input
          type="text"
          name="name"
          id="name"
          value={title.title}
          onChange={handleChangeT}
        />
        <input
          type="checkbox"
          checked={publicPost}
          onChange={handleChange}
          name="publicSelect"
          id="publicSelect"
        />
        <label htmlFor="publicSelect">Make this post public?</label>
      </form>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={postTemplate}
        children={null}
      />
    </div>
  );
}
