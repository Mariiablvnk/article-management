import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { clerkClient } from '@clerk/clerk-sdk-node'; // Import from the correct package

const prisma = new PrismaClient();
console.log('Clerk Secret Key:', process.env.CLERK_SECRET_KEY);

async function main() {
  try {
    // Create admin user in Clerk
    const user = await clerkClient.users.createUser({
      emailAddress: ['admin@admin.com'], 
      username: 'main-admin',
      password: 'admin-pass-123', // Clerk handles hashing internally
    });

    console.log('Clerk User Created:', user);

    // Hash the password for database storage
    const hashedPassword = await bcrypt.hash('admin-pass-123', 10);

    // Insert user into Prisma database
    await prisma.user.upsert({
      where: { email: 'admin@admin.com' },
      update: { role: 'ADMIN' },
      create: {
        email: 'admin@admin.com',
        username: 'main-admin',
        password: hashedPassword, // Store hashed password
        role: 'ADMIN',
        id: user.id, // Ensure this matches your Prisma schema
      },
    });

    console.log('Default admin user created and synced');
  } catch (error) {
    if (error && error) {
      // Log detailed Clerk error if available
      console.error('Clerk Error:', error);
    } else {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
