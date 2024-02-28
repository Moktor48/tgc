//Page for posts to be read, edited, and approved

"use client";
import React, { useCallback, useState } from "react";
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
import Image from "@tiptap/extension-image";
import FileHandler from "@tiptap-pro/extension-file-handler";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";

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
    const addImage = useCallback(() => {
      const url = window.prompt("URL");

      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }, [editor]);
    const setLink = useCallback(() => {
      const previousUrl = editor.getAttributes("link").href as string;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }
      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url ?? "" })
        .setColor("#323FFB")
        .setUnderline()
        .run();
    }, [editor]);
    const [barState, setBarState] = useState("default");
    return (
      <div className="menu-bar">
        <div>
          <button
            className={`min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            onClick={addImage}
          >
            Set Image
          </button>
          <button
            className={`${barState === "default" ? "is-active border-yellow-500" : ""} min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            onClick={() => setBarState("default")}
          >
            Basic Format
          </button>
          <button
            className={`${barState === "color" ? "is-active border-yellow-500" : ""} min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            onClick={() => setBarState("color")}
          >
            Colors
          </button>
          <button
            className={`${barState === "table" ? "is-active border-yellow-500" : ""} min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            onClick={() => setBarState("table")}
          >
            Table
          </button>
        </div>

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
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${editor.isActive("underline") ? "is-active" : ""} min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              toggleUnderline
            </button>
            <button
              onClick={setLink}
              className={`${
                editor.isActive("link") ? "is-active border-yellow-500" : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              setLink
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2"
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive("link")}
            >
              unsetLink
            </button>
          </BubbleMenu>
        )}

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

        {barState === "default" && (
          <div>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`${
                editor.isActive("paragraph")
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              paragraph
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${
                editor.isActive("blockquote")
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              blockquote
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
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`${
                editor.isActive("codeBlock")
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 `}
            >
              code block
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
          </div>
        )}

        {/* TABLE TOOLS */}
        {barState === "table" && (
          <div>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
            >
              insertTable
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              addColumnBefore
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              addColumnAfter
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              deleteColumn
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              addRowBefore
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              addRowAfter
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              deleteRow
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              deleteTable
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().mergeCells().run()}
            >
              mergeCells
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().splitCell().run()}
            >
              splitCell
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
            >
              toggleHeaderColumn
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            >
              toggleHeaderRow
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              toggleHeaderCell
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
            >
              mergeOrSplit
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() =>
                editor.chain().focus().setCellAttribute("colspan", 2).run()
              }
            >
              setCellAttribute
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().fixTables().run()}
            >
              fixTables
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().goToNextCell().run()}
            >
              goToNextCell
            </button>
            <button
              className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
              onClick={() => editor.chain().focus().goToPreviousCell().run()}
            >
              goToPreviousCell
            </button>
          </div>
        )}

        {barState === "color" && (
          <div>
            <button
              onClick={() => editor.chain().focus().setColor("#958DF1").run()}
              className={`${
                editor.isActive("textStyle", { color: "#958DF1" })
                  ? "is-active border-yellow-500"
                  : ""
              }
                  min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setPurple"
            >
              Purple
            </button>

            <button
              onClick={() => editor.chain().focus().setColor("#F98181").run()}
              className={`${
                editor.isActive("textStyle", { color: "#F98181" })
                  ? "is-active border-yellow-500"
                  : ""
              } min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setRed"
            >
              Red
            </button>

            <button
              onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
              className={`${
                editor.isActive("textStyle", { color: "#FBBC88" })
                  ? "is-active border-yellow-500"
                  : ""
              }
                min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setOrange"
            >
              Orange
            </button>

            <button
              onClick={() => editor.chain().focus().setColor("#FAF594").run()}
              className={`${
                editor.isActive("textStyle", { color: "#FAF594" })
                  ? "is-active border-yellow-500"
                  : ""
              }
                min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setYellow"
            >
              Yellow
            </button>

            <button
              onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
              className={`${
                editor.isActive("textStyle", { color: "#70CFF8" })
                  ? "is-active border-yellow-500"
                  : ""
              }
                min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setBlue"
            >
              Blue
            </button>

            <button
              onClick={() => editor.chain().focus().setColor("#94FADB").run()}
              className={`${
                editor.isActive("textStyle", { color: "#94FADB" })
                  ? "is-active border-yellow-500"
                  : ""
              }
                min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setTeal"
            >
              Teal
            </button>

            <button
              onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
              className={`${
                editor.isActive("textStyle", { color: "#B9F18D" })
                  ? "is-active border-yellow-500"
                  : ""
              }
                min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="setGreen"
            >
              Green
            </button>

            <button
              onClick={() => editor.chain().focus().unsetColor().run()}
              className={`${
                editor.isActive("unsetColor")
                  ? "is-active border-yellow-500"
                  : ""
              }
                min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2`}
              data-testid="unsetColor"
            >
              Remove Color
            </button>
          </div>
        )}

        {/* Un-do Re-do Submit TOOLS */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
        >
          UNDO
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="min-w-30 transform justify-center rounded-2xl border-b-4 border-gray-500 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 px-2 py-1 text-xs text-gray-100 transition  duration-200 ease-in-out hover:translate-y-px hover:border-b-2 "
          disabled={!editor.can().chain().focus().redo().run()}
        >
          REDO
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
    FileHandler.configure({
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      onDrop: (currentEditor, files, pos) => {
        files.forEach((file) => {
          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(pos, {
                type: "image",
                attrs: {
                  src: fileReader.result,
                },
              })
              .focus()
              .run();
          };
        });
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach((file) => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            // eslint-disable-line no-console
            return false;
          }

          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(currentEditor.state.selection.anchor, {
                type: "image",
                attrs: {
                  src: fileReader.result,
                },
              })
              .focus()
              .run();
          };
        });
      },
    }),
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
    Image.configure({
      allowBase64: true,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Link.configure({
      openOnClick: false,
      autolink: true,
      validate: (href) => /^https?:\/\//.test(href),
    }),
    Underline,
    FontFamily,
    TextAlign,
    Subscript,
    Superscript,
    Youtube,
    Typography,
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
