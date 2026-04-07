import { Request, Response } from "express";
import {
    getAllUsers,
    handleCreateUser,
    handleDeleteUser,
    getUserById,
    updateUserById
} from "services/user.service";

// Hiển thị trang chủ và danh sách user
const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    console.log("users:", users);

    return res.render("home.ejs", { users });
};

// Hiển thị trang form tạo user
const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user.ejs");
};

// Xử lý tạo user mới từ dữ liệu form
const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;

    await handleCreateUser(fullName, email, address);

    return res.redirect("/");
};

// Xử lý xóa user theo id
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    console.log("delete id =", id);

    await handleDeleteUser(id);
    
    return res.redirect("/");
};

// xem chi tiết user theo id
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
const user = await getUserById(id);

    return res.render("view-users.ejs", { 
        id: id,
        user: user
     });
};

// Xử lý cập nhật user theo id
const postUpdateUser = async (req: Request, res: Response) => {
   const { id, fullName, email, address } = req.body;
   await updateUserById(id, email, address, fullName);

 return res.redirect("/" );
};
export {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getViewUser ,
    postUpdateUser
};