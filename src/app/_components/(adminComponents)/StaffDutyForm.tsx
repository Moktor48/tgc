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
  const parsedData: EntryType[] = [];
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
    },
    onError: () => {
      alert("There was an error uploading the data");
    },
  });

  // FIX THIS: It is filling in the same data for all entries
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
            if (values[2] === "Inv") {
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
            } else if (values[2] === "Join") {
              newEntry.duty_type = 96;
            } else if (values[2] === "Pro") {
              newEntry.duty_type = 98;
            } else if (values[2] === "Kick") {
              newEntry.duty_type = 99;
            } else if (values[2] === "Dem") {
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
          });
          formSubmit.mutate(parsedData);
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <h3>Select a file to upload:</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={guildInfo === "0"}>
        Upload
      </button>
      <form action="">
        <h3>Choose a Guild:</h3>
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
        <input type="submit" name="submit" value="Upload File" />
      </form>
    </div>
  );
}

/*

IF
guildInfo = "0"        values[2] = "Inv"    newEntry.duty_type = "100"
          = "1"                                             = "91"
          = "2"                                             = "92"
          = "3"                                             = "93"
          = "4"                                             = "94"
          = "5"                                             = "95"
          = "9"                                             = "89"
          = "10"                                            = "90"

if (values[2] === "Inv") {
  if (guildInfo === "0") {
    newEntry.duty_type = "100";
  } else if (guildInfo === "1") {
    newEntry.duty_type = "91";
  } else if (guildInfo === "2") {
    newEntry.duty_type = "92";
  } else if (guildInfo === "3") {
    newEntry.duty_type = "93";
  } else if (guildInfo === "4") {
    newEntry.duty_type = "94";
  } else if (guildInfo === "5") {
    newEntry.duty_type = "95";
  } else if (guildInfo === "9") {
    newEntry.duty_type = "89";
  } else if (guildInfo === "10") {
    newEntry.duty_type = "90";
  }
}

if (values[2] === "Inv") {
  guildInfo === "0" ? newEntry.duty_type = "100" : guildInfo === "1" ? newEntry.duty_type = "91" : guildInfo === "2" ? newEntry.duty_type = "92" : guildInfo === "3" ? newEntry.duty_type = "93" : guildInfo === "4" ? newEntry.duty_type = "94" : guildInfo === "5" ? newEntry.duty_type = "95" : guildInfo === "9" ? newEntry.duty_type = "89" : guildInfo === "10" ? newEntry.duty_type = "90" : null;
} else if (values[2] === "Join") {newEntry.duty_type = "96"} else if (values[2] === "Pro") {newEntry.duty_type = "98"} else if (values[2] === "Kick") {newEntry.duty_type = "99"} else if (values[2] === "Dem") {newEntry.duty_type = "97"} else if (values[2] === "Left") {newEntry.duty_type = "95"}


        case 'Join':
            return 96;
        
        case 'Pro':
            return 98;
        case 'Kick':
            return 99;
        case 'Dem':
            return 97;
        case 'Left':
            return 95;
        default:
            return -1;

case 'Inv':
            return 100;
*/
