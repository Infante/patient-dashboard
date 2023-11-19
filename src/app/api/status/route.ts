import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
    message: string
    success: boolean
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    return res
        .status(200)
        .json({ success: true, message: "Hello from Finni Api" })
}
