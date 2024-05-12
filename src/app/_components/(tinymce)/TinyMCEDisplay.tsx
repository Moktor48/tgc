"use client";
import { api } from "~/trpc/react";
import parse from "html-react-parser";
import { Element } from "html-react-parser";
import type { HTMLReactParserOptions } from "html-react-parser";

export default function TinyMCEDisplay({
  postId,
}: {
  id: string;
  postId: string;
}) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        // ...
      }
    },
  };
  //Read-Only Display logic
  const display = api.get.getPost.useQuery({ postId: postId });

  if (!display) return <p>No Data!</p>;

  return (
    <div>
      <h1>{display.data?.title}</h1>
      <h2>{display.data?.summary}</h2>
      <div className="w-full bg-white text-black">
        {display.data?.content ? parse(display.data.content, options) : null}
      </div>
    </div>
  );
}
