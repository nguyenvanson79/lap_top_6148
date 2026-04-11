import { prisma } from "./client"
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";


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
        const defaultPassword = await hashPassword("12345678");
        const adminRole = await prisma.role.findFirst({ where: { name: "admin" } });
        if (adminRole)
        await prisma.user.createMany({
            data: [
                {
                    fullName: "user",
                    username: "user@gmail.com",
                    address: "123 Main St",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId : adminRole.id

                },
                {
                    fullName: "admin",
                    username: "admin@gmail.com",
                    address: "456 Elm St",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId : adminRole.id
                }
            ]
        });
        console.log("Seeded users");
    } else {
        console.log("Users already exist. Skipping users.");
    }
}

export default initDatabase;