import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]"
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

type Data = {
  user: any | null;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const session = await getServerSession(req, res, authOptions)
    res.status(200).json({ user: session });

    if (session && session.user?.name) {
        const user = prisma.users.findFirst({
            where: {
                username: session.user?.name
            }
        })
        res.status(200).json({ user: user });
    } else {
        res.status(200).json({ user: null });
    }
}
