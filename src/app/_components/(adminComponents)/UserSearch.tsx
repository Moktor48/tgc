"use client";
import React, { useState } from "react";

export default function UserSearch() {
  const [formData, setFormData] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <section className="formPlate">
        <form onSubmit={handleSubmit}>
          <label className="">Search for users</label>
          <input type="text" name="search" onChange={handleChange} />
          <button className="button-40">Search</button>
        </form>
      </section>
    </div>
  );
}
/* 
Form to search for users. 
*/
