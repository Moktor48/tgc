"use client";
import parse from "html-react-parser";
import { Element } from "html-react-parser";
import type { HTMLReactParserOptions } from "html-react-parser";

type BugType = {
  id: string;
  title: string;
  content: string;
  createdBy: {
    name: string;
    id: string;
  };
} | null;

export default function TinyMCEDisplayBug({ data }: { data: BugType }) {
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
      <h2>Submitted by: {data?.createdBy.name}</h2>
      <div className="w-full bg-white text-black">
        {data?.content ? parse(data.content, options) : null}
      </div>
    </div>
  );
}
