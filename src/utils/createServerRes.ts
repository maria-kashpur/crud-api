import { Response } from "../types/types";

export default function createServerRes(
  res: Response,
  status: number,
  data?: unknown,
) {
  res.statusCode = status;

  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(data));
  }
  res.end();
}
