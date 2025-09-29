import jwt from "jsonwebtoken"

export const generatePaymentToken = (payload: object) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: "15m" })
}

export const verifyPaymentToken = (token: string) => {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!)
}
