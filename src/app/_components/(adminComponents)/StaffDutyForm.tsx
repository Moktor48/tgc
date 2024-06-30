"use client";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/trpc/react";
import moment from "moment-timezone";

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

export default function StaffDutyForm({ user }: { user: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [guildInfo, setGuildInfo] = useState<string>("0");
  const [zone, setZone] = useState<string>("0");
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const userDump = api.get.discordUserQuery.useQuery();
  const dumpData = userDump.data;

  const entry = {
    timestamp: new Date(), // [0]
    gmember_id: "", // [1]
    duty_type: 0, // [2]
    //Qty: "", unused, left here for completeness [3]
    //What: "", unused, left here for completeness [4]
    eso_target_user: "", // [5]
    //Value: "", unused, left here for completeness [6]
    //Tax: "", unused, left here for completeness [7]
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

      reader.onload = function (event) {
        const fileContent = event.target?.result;

        if (typeof fileContent === "string") {
          const lines = fileContent.split("\n");
          const parsedData: EntryType[] = [];

          // start of forEach
          lines.forEach((line) => {
            const newEntry = { ...entry };
            const values = line.split("\t");
            const dateTime = values[0]!;
            const time = moment
              .tz(dateTime, zone)
              .tz("America/New_York")
              .format();
            const name = dumpData?.find(
              (user) => user.ingame_name === values[1],
            );
            if (name) {
              newEntry.gmember_id = name.gmember_id;
            }
            if (!name) return;
            if (values[2] === "Invited") {
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
              guildInfo === "0"
                ? (newEntry.duty_type = 96)
                : guildInfo === "1"
                  ? (newEntry.duty_type = 961)
                  : guildInfo === "2"
                    ? (newEntry.duty_type = 962)
                    : guildInfo === "3"
                      ? (newEntry.duty_type = 963)
                      : guildInfo === "4"
                        ? (newEntry.duty_type = 964)
                        : guildInfo === "5"
                          ? (newEntry.duty_type = 965)
                          : guildInfo === "9"
                            ? (newEntry.duty_type = 966)
                            : guildInfo === "10"
                              ? (newEntry.duty_type = 967)
                              : null;
            } else if (values[2] === "Promoted") {
              newEntry.duty_type = 98;
            } else if (values[2] === "Kicked") {
              newEntry.duty_type = 99;
            } else if (values[2] === "Demoted") {
              newEntry.duty_type = 97;
            } else if (values[2] === "Left") {
              guildInfo === "0"
                ? (newEntry.duty_type = 96)
                : guildInfo === "1"
                  ? (newEntry.duty_type = 951)
                  : guildInfo === "2"
                    ? (newEntry.duty_type = 952)
                    : guildInfo === "3"
                      ? (newEntry.duty_type = 953)
                      : guildInfo === "4"
                        ? (newEntry.duty_type = 954)
                        : guildInfo === "5"
                          ? (newEntry.duty_type = 955)
                          : guildInfo === "9"
                            ? (newEntry.duty_type = 956)
                            : guildInfo === "10"
                              ? (newEntry.duty_type = 957)
                              : null;
            } else if (values[2] === "Accepted") {
              newEntry.duty_type = 48;
            } else if (values[2] === "Declined") {
              newEntry.duty_type = 49;
            }
            newEntry.timestamp = new Date(time);
            newEntry.eso_target_user = values[5] ?? "";
            parsedData.push(newEntry);
          }); // end of forEach
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
        <h2 className="bg-black text-red-500">
          PLEASE ensure the guild selected matches the SnapShot file uploaded!!!
          This can cause MAJOR problems for the database.
        </h2>
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
        <h3 className="bg-black text-red-500">
          Choose the timezone the SnapShot was CREATED in. Very important!!!
        </h3>
        <br />
        <select
          name="timeZone"
          id="timeZone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          <option value={0}>Select a Time Zone for SnapShot</option>
          <option value={"America/New_York"}>Eastern</option> {/* -5 */}
          <option value={"America/Argentina/Buenos_Aires"}>
            Stupid Fix
          </option>{" "}
          {/* -6 */}
          <option value={"America/Denver"}>Mountain</option> {/* -7 */}
          <option value={"America/Los_Angeles"}>Pacific</option> {/* -8 */}
          <option value={"America/Phoenix"}>AZ</option> {/* -7 */}
        </select>
        <br />
        <span className="bg-black text-red-500">
          WARNING! DOUBLE check that you are submitting the correct file to the
          correct guild!!!!! Once you submit, it makes a permanent entry to the
          database!
        </span>
        {user === "moktor" && (
          <button
            className="button-40 text-green-500"
            onClick={handleFileUpload}
            disabled={guildInfo === "0" ?? zone === "0"}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
