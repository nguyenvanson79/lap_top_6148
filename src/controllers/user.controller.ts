import { Request, Response } from "express";
import {
    getAllUsers,
    handleCreateUser,
    handleDeleteUser,
    getUserById,
    updateUserById,
    getAllRoles
} from "services/user.service";



// Hiển thị trang chủ và danh sách user
const getHomePage = async (req: Request, res: Response) => {


    return res.render("client/home/show.ejs");
};

// Hiển thị trang form tạo user
const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", { roles });
};

// Xử lý tạo user mới từ dữ liệu form
const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;

    const file = req.file;
    const avatar = file?.filename || "";

    await handleCreateUser(fullName, username, address, phone, avatar , role);

    return res.redirect("/admin/user");
};

// Xử lý xóa user theo id
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    await handleDeleteUser(id);

    return res.redirect("/admin/user");
};

// xem chi tiết user theo id
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await getUserById(id);
    const roles = await getAllRoles();


    return res.render("admin/user/detail.ejs", {
        id: id,
        user: user,
        roles: roles
    });
};

// Xử lý cập nhật user theo id
const postUpdateUser = async (req: Request, res: Response) => {
    const { id , fullName, phone, role, address } = req.body;

    const file = req.file;
    const avatar = file?.filename || "";

    await updateUserById(id, fullName, phone, role, address, avatar);

    return res.redirect("/admin/user");
};








export {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getViewUser,
    postUpdateUser
};