import { prisma } from "./client"

const initDatabase = async () => {
    const countUsers = await prisma.user.count();
    const countRoles = await prisma.role.count();

    if (countRoles === 0) {
        await prisma.role.createMany({
            data: [
                { name: "admin", description: "Administrator role" },
                { name: "user", description: "User role" }
            ]
        });
        console.log("Seeded roles");
    } else {
        console.log("Roles already exist. Skipping roles.");
    }

    if (countUsers === 0) {
        await prisma.user.createMany({
            data: [
                {
                    fullName: "Nguyen Van A",
                    username: "nguyenvana",
                    address: "123 Main St",
                    password: "password123",
                    accountType: "admin",
                },
                {
                    fullName: "Le Thi B",
                    username: "lethib",
                    address: "456 Elm St",
                    password: "password456",
                    accountType: "user",
                }
            ]
        });
        console.log("Seeded users");
    } else {
        console.log("Users already exist. Skipping users.");
    }
}

export default initDatabase;