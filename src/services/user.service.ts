import { prisma } from "config/client";
import { PrismaClient } from '@prisma/client'
import { ACCOUNT_TYPE, TOTAL_ITEM_PER_PAGE } from "config/constant";

import bcrypt from 'bcrypt';
const saltRounds = 10;


const hashPassword = async (plaintext: string) => {
    return await bcrypt.hash(plaintext, saltRounds);
}

const comparePassword = async (plainText: string, hashPassword: string) => {
    return await bcrypt.compare(plainText, hashPassword)
}


// Hàm tạo user mới
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    avatar: string,
    role: string
) => {

    const defaultPassword = await hashPassword("123456");
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role // Chuyển role từ string sang number trước khi lưu vào database
        }
    });
    return newUser;
};

// Hàm lấy toàn bộ danh sách user
const getAllUsers = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const skip = (page - 1) * pageSize;
    const users = await prisma.user.findMany({
        skip: skip,
        take: pageSize
    });
    return users;
}

const countTotaUserPages= async() =>{
    const pageSize = TOTAL_ITEM_PER_PAGE ;
    const totalItems = await prisma.user.count();
    const totalPages = Math.ceil(totalItems / pageSize)
    return totalPages ;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

// Hàm xóa user theo id
const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({ where: { id: +id } });
}



// Hàm xem chi tiết user theo id
const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id }
    });
    return user;
}

// Hàm cập nhật user theo id
const updateUserById = async (id: string, fullName: string, phone: string, role: string, address: string, avatar: string) => {
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: fullName,
            phone: phone,
            roleId: +role,
            address: address,
            ...(avatar != "" ? { avatar: avatar } : {}),
        }
    });
    return updateUser;
}

















export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    getUserById,
    updateUserById,
    getAllRoles,
    hashPassword,
    comparePassword ,
    countTotaUserPages
}