//Page for posts to be read, edited, and approved

"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useCurrentEditor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSearchParams } from "next/navigation";

export default function page({ params }: { params: { postId: string } }) {
  const session = useSession();
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
  const modPost = { post: "", title: "" };
  const [modTitle, setModTitle] = useState({ title: title });
  const postId = params.postId;
  const { data: post } = api.get.getPost.useQuery({ postId: postId });
  if (!session ?? !session.data)
    return <div>You must be logged in to view this page.</div>;
  const userId = session.data.user.id;
  if (!post) return <div>Post not found.</div>;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setModTitle({ ...modTitle, title: e.target.value });
  }

  const MenuBar = () => {
    const { editor } = useCurrentEditor();
    if (!editor) return null;

    const mod = api.post.modTrack.useMutation({
      onSuccess: () => {
        location.assign("/editor/approve");
      },
    });

    const update = api.put.updatePost.useMutation({
      onSuccess: () => {
        mod.mutate({
          postId: postId,
          modById: userId,
          post: modPost.post,
          title: modPost.title,
          published: "Published",
        });
      },
    });

    function submit() {
      if (!editor) return null;

      const content = editor.getHTML();
      if (post?.title === modTitle.title) modPost.title = "No changes made";
      if (post?.post === content) modPost.post = "No changes made";
      if (post?.title != modTitle.title) modPost.title = post!.title!;
      if (post?.post != content) modPost.post = post!.post!;
      update.mutate({
        postId: postId,
        title: modTitle.title,
        post: content,
        published: true,
      });
    }
    return (
      <div className="menu-bar">
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
        {/*      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${editor.isActive('heading', { level: 4 }) ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${editor.isActive('heading', { level: 5 }) ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${editor.isActive('heading', { level: 6 }) ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        h6
      </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList") ? "is-active border-yellow-500" : ""
          } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${
            editor.isActive("orderedList") ? "is-active border-yellow-500" : ""
          } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
        >
          ordered list
        </button>
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
      <form>
        <input
          type="text"
          name="name"
          id="name"
          value={modTitle.title}
          onChange={handleChange}
        />
      </form>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={post.post}
        children={null}
      />
    </div>
  );
}