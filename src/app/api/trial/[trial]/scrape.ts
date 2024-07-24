import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

// Define a type for the response body in case of success
interface SuccessResponse {
  title: string;
}

// Define a type for the response body in case of error
interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method === "POST") {
    const { url } = req.body as { url: string };
    try {
      const { data } = await axios.get<string>(url);
      const $ = cheerio.load(data);
      const pageTitle = $("title").text();

      res.status(200).json({ title: pageTitle });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch the URL" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
