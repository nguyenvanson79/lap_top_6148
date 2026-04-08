import { prisma } from "config/client";
import getConnection from "../config/database"
import { PrismaClient } from '@prisma/client'


// Hàm tạo user mới
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string
) => {
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "",
            accountType: "",
        }
    });
    return newUser;
};

// Hàm lấy toàn bộ danh sách user
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

// Hàm xóa user theo id
const handleDeleteUser = async (id: string) => {
const deleteUser = await prisma.user.delete({where: { id: +id }});
}

// Hàm xem chi tiết user theo id
const getUserById = async (id: string) => {
   const user = await prisma.user.findUnique({
        where: { id: +id }
    });
    return user;
}

// Hàm cập nhật user theo id
const updateUserById = async (id: string, email: string, address: string , fullName: string ) => {
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "",
            accountType: "",
        }
    });
    return updateUser;
}

















export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    getUserById,
    updateUserById
}