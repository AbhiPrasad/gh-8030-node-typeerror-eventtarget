import { NextRequest, NextResponse } from "next/server";
import ky from "ky";
import { captureException } from "../../code/capture-exception";
import { FsError } from "../../code/fserror";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // main file

  // ky-universal
  ky.get("http://example.com")
    .json<any>()
    .then((query) => query.data)
    .catch((e) => {
      captureException(new FsError("error fetching replay snapshot file", e));
      return null;
    });

  res.status(200).json({ name: "John Doe" });
}
