import dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;

export const HOST = "localhost";

export const USER_WHITH_ID = /^\/api\/users\/[^\/]+$/;

export const isMulti = process.argv.includes("--multi");
