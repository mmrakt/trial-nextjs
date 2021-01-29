import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const user = await prisma.user.findUnique({
            where: { id: req.query.id[0] },
        })
        return res.status(200).json(user)
    }
}
