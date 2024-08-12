import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import prisma from '../../../db_utility'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // Fetch user details from Clerk
        const user = await clerkClient.users.getUser(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        } else {
            console.log(userId, user);

            // Sync user with Prisma database
            const db_user = await prisma.user.upsert({
                where: { email: user.emailAddresses[0].emailAddress },
                update: {
                    username: user.username || user.emailAddresses[0].emailAddress,
                },
                create: {
                    id: user.id, // Ensure this field exists in your Prisma schema
                    email: user.emailAddresses[0].emailAddress,
                    username: user.username || user.emailAddresses[0].emailAddress,
                    password: '', // Typically passwords are not stored in plaintext
                    role: 'USER',
                },
            });

            res.status(200).json({ message: 'User synced', db_user });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
