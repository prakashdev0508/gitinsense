import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "fallbackSecretKey";

if (!SECRET_KEY) {
  throw new Error(
    "SECRET_KEY is not defined. Please set it in your environment.",
  );
}

export function generateToken(payload?: string) {
  const token = jwt.sign({ id: payload }, SECRET_KEY, { expiresIn: "7d" });
  return token;
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}
