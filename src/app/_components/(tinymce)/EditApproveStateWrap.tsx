"use client";
import React, { useState } from "react";
import TinyMCEDisplay from "./TinyMCEDisplay";
import TinyMCEEdit from "./TinyMCEEdit";
import type { DisplayType } from "~/type";
import { api } from "~/trpc/react";
export default function EditApproveStateWrap({
  data,
  params,
}: {
  data: DisplayType;
  params: { id: string; postId: string };
}) {
  if (!data) return <p>No Data!</p>;

  const [page, setPage] = useState("display");
  const postId = params.postId;
  const approveDisplay = api.put.publish.useMutation({
    onSuccess: () => {
      alert("Post Published!");
      location.href = `/editor/${params.id}/approve`;
    },
  });
  const check = () => {
    if (!data.title || !data.content || !data.summary) {
      alert("Please fill out all fields");
      return;
    } else {
      return;
    }
  };
  const handleApproveDisplay = () => {
    check();
    approveDisplay.mutate({
      postId: postId,
      published: true,
    });
  };

  return (
    <div>
      {/*Approve a post as-is, and publish*/}

      {page === "display" && (
        <button
          onClick={() => {
            setPage("edit");
          }}
          className="button-40 text-yellow-500"
        >
          Modify
        </button>
      )}
      {page === "display" && <TinyMCEDisplay data={data} />}
      {page === "display" && (
        <button
          onClick={handleApproveDisplay}
          className="button-40 text-green-500"
        >
          Publish Post
        </button>
      )}
      {/*REJECTION! This will notify the owner of a rejection, with notes*/}
      {page === "display" && (
        <button className="button-40 text-red-500">
          Reject: Return to Author
        </button>
      )}
      {/*Modify a post, then publish it*/}

      {page === "edit" && (
        <button
          onClick={() => {
            setPage("display");
          }}
          className="button-40 text-yellow-500"
        >
          Display Original
        </button>
      )}
      {page === "edit" && <TinyMCEEdit modById={params.id} data={data} />}
    </div>
  );
}
