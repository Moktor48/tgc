'use client'
import React, { useEffect, useState } from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useCurrentEditor, EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { api } from '~/trpc/react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
type FormData = {
  postId: string
  eso: boolean
  ffxiv: boolean
  swtor: boolean
  general: boolean
  staff: boolean
  raid: boolean
  officer: boolean
}

const build = `<p><strong>Test Template BUILD!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`
const guide = `<p><strong>Test Template GUIDE!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`
const notification = `<p><strong>Test Template NOTIFICATION!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`
const report = `<p><strong>Test Template REPORT!!!</strong></p><p>Setting a template up for builds...</p><p></p><p>So, a table here, and some links there...</p><h2></h2>`

export default function PostSubmit () {
  const { data } = useSession()
  const session = data
  if (!session) return null
  const userId = session.user.id
  const searchParams = useSearchParams()
  //These will set GAME, TYPE of document, and ROLE the document is intended for.
  const gameSelect = searchParams.get('game')!
  const typeSelect = searchParams.get('type')!
  const roleSelect = searchParams.get('role')!
  const [formDataText, setFormDataText] = useState({title: 'Enter Title Here'})
  //Permission data is set through the previous page set-up
  const [permissionData, setPermissionData] = useState<FormData>({postId: "", eso: false, ffxiv: false, swtor: false, general: false, staff: false, raid: false, officer: false})
  const postTemplate = typeSelect === "1"? build : typeSelect === "2"? guide : typeSelect === "3"? notification : report

//Function to submit the permission data
  const subPerm = api.post.postPermissions.useMutation()
//Function to submit the post data, then on response adds permissions to the post_permission table
  const subData = api.post.post.useMutation({
    onSuccess(data) {
      const postId = data.id
      if (!postId) return null
      subPerm.mutate(permissionData)
    },
  })
//State for post TITLE
  const handleChangeT = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataText({...formDataText, title: e.target.value})
  }

// MenuBar START =====================> Watch placement of elements!!!
  const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  async function submit() {
    setPermissionData({...permissionData, [gameSelect]: true, [roleSelect]: true})
    if (!editor) return null
    if (formDataText.title === 'Enter Title Here') return null
    const content = editor.getHTML()
    subData.mutate({
        createdById: userId,
        post: content,
        title: formDataText.title,
    })
  }

  return (
    <>
    <div>
      <form>
        <input type="text" name="name" id="name" value={formDataText.title} onChange={handleChangeT} />
      </form>
    </div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`${editor.isActive('bold') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`${editor.isActive('italic') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`${editor.isActive('strike') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`${editor.isActive('code') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px ">
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()} className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px ">
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${editor.isActive('paragraph') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${editor.isActive('heading', { level: 1 }) ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${editor.isActive('heading', { level: 2 }) ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${editor.isActive('heading', { level: 3 }) ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
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
        className={`${editor.isActive('bulletList') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${editor.isActive('codeBlock') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${editor.isActive('blockquote') ? 'is-active border-yellow-500' : ''} text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px `}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px ">
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()} className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px ">
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px "
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()} 
        className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400  via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px "
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>

      <button
        onClick={submit}
        className="text-gray-100 text-xs min-w-30 justify-center transition duration-200 ease-in-out transform px-2 py-1 border-b-4 border-red-500 hover:border-b-2 bg-gradient-to-t from-red-400  via-red-600 to-red-200 rounded-2xl hover:translate-y-px"
      >
        Submit
      </button>
    </>
  )
}

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
]

  return (
    <div className="bg-black">
      <EditorProvider 
        slotBefore={<MenuBar />} 
        extensions={extensions} 
        content={postTemplate}
        children={null}
      />
    </div>
  )
}

