"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function TrialParser() {
  const [url, setUrl] = useState("");
  const { mutate, data, error } = api.post.scrape.useMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ url });
    if (error) {
      alert("Failed to fetch the URL");
      return;
    }
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Scrape</button>
      </form>
      {data && <h2 className="bg-black">{data.title}</h2>}
    </div>
  );
}
