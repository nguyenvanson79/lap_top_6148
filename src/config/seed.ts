// tạo data face 

import { prisma } from "./client"

const initDatabase = async () => {

    const countUsers = await prisma.user.count();
    if (countUsers > 0) {
        console.log('Database already seeded. Skipping seeding process.');
        return;
    } else {
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
                    address: "456 Elm St ",
                    password: "password456",
                    accountType: "user",
                }


            ]
        })    }

   
}

export default initDatabase
