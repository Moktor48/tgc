"use client";
import parse from "html-react-parser";
import { Element } from "html-react-parser";
import type { HTMLReactParserOptions } from "html-react-parser";
import type { DisplayType } from "~/type";
export default function TinyMCEDisplay({ data }: { data: DisplayType }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        // ...
      }
    },
  };

  return (
    <div>
      <h1>Title: {data?.title}</h1>
      <h2>Summary: {data?.summary}</h2>
      <div className="w-full bg-white text-black">
        {data?.content ? parse(data.content, options) : null}
      </div>
    </div>
  );
}
