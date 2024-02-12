import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const HOST = "localhost";

export const USER_WHITH_ID = /^\/api\/users\/[^\/]+$/;
