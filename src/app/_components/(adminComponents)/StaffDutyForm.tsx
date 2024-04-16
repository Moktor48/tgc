"use client";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/trpc/react";
type EntryType = {
  timestamp: Date;
  gmember_id: string;
  duty_type: number;
  //Qty: string;
  //What: string;
  eso_target_user: string;
  //Value: string;
  //Tax: string;
};

export default function StaffDutyForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [guildInfo, setGuildInfo] = useState<string>("0");
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const userDump = api.get.discordUserQuery.useQuery();
  const dumpData = userDump.data;

  const entry = {
    timestamp: new Date(),
    gmember_id: "",
    duty_type: 0,
    //Qty: "",
    //What: "",
    eso_target_user: "",
    //Value: "",
    //Tax: "",
  };
  const formSubmit = api.post.staffDuty.useMutation({
    onSuccess: () => {
      alert("Data has been uploaded");
      location.reload();
    },
    onError: () => {
      alert("There was an error uploading the data");
    },
  });

  const handleFileUpload = () => {
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".txt")) {
        alert("Invalid file type. Please upload a .txt file.");
        return;
      }
      const reader = new FileReader();
      console.log(guildInfo);
      reader.onload = function (event) {
        const fileContent = event.target?.result;

        if (typeof fileContent === "string") {
          const lines = fileContent.split("\n");
          const parsedData: EntryType[] = [];

          // start of forEach
          lines.forEach((line) => {
            const newEntry = { ...entry };
            const values = line.split("\t");
            const time = new Date(values[0]!).toISOString();
            const name = dumpData?.find(
              (user) => user.ingame_name === values[1],
            );
            if (name) {
              newEntry.gmember_id = name.gmember_id;
            }
            if (!name) return;
            if (
              values[2] === "Invited" ||
              values[2] === "Accepted" ||
              values[2] === "Declined"
            ) {
              guildInfo === "0"
                ? (newEntry.duty_type = 100)
                : guildInfo === "1"
                  ? (newEntry.duty_type = 91)
                  : guildInfo === "2"
                    ? (newEntry.duty_type = 92)
                    : guildInfo === "3"
                      ? (newEntry.duty_type = 93)
                      : guildInfo === "4"
                        ? (newEntry.duty_type = 94)
                        : guildInfo === "5"
                          ? (newEntry.duty_type = 95)
                          : guildInfo === "9"
                            ? (newEntry.duty_type = 89)
                            : guildInfo === "10"
                              ? (newEntry.duty_type = 90)
                              : null;
            } else if (values[2] === "Joined") {
              newEntry.duty_type = 96;
            } else if (values[2] === "Promoted") {
              newEntry.duty_type = 98;
            } else if (values[2] === "Kicked") {
              newEntry.duty_type = 99;
            } else if (values[2] === "Demoted") {
              newEntry.duty_type = 97;
            } else if (values[2] === "Left") {
              newEntry.duty_type = 95;
            }
            newEntry.timestamp = new Date(time);
            //newEntry.duty_type = values[2] ?? "";
            //newEntry.Qty = values[3] ?? "";
            //newEntry.What = values[4] ?? "";
            newEntry.eso_target_user = values[5] ?? "";
            //newEntry.Value = values[6] ?? "";
            //newEntry.Tax = values[7] ?? "";
            parsedData.push(newEntry);
          }); // end of forEach
          console.log(parsedData);
          formSubmit.mutate(parsedData);
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="column flex w-full justify-center">
      <div className="newsletter flex w-1/3">
        <h3 className="text-white">Select a file to upload:</h3>
        <br />
        <input className="text-white" type="file" onChange={handleFileChange} />
        <br />

        <h3 className="text-white">Choose a Guild:</h3>
        <select
          name="guildType"
          id="guildType"
          value={guildInfo}
          onChange={(e) => setGuildInfo(e.target.value)}
        >
          <option value={0}>Select an Option</option>
          <option value={1}>TGC1</option>
          <option value={2}>TGC2</option>
          <option value={3}>TGC3</option>
          <option value={4}>TGC4</option>
          <option value={5}>TGC5</option>
          <option value={9}>TNC</option>
          <option value={10}>TDC</option>
        </select>
        <br />
        <span className="bg-black text-red-500">
          WARNING! DOUBLE check that you are submitting the correct file to the
          correct guild!!!!! Once you submit, it makes a permanent entry to the
          database!
        </span>
        <button
          className="button-40 text-green-500"
          onClick={handleFileUpload}
          disabled={guildInfo === "0"}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
