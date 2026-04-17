import { Request, Response } from "express";
import { countTotalProductClientPages, getProducts } from "services/client/item.service";
import {
    getAllUsers,
    handleCreateUser,
    handleDeleteUser,
    getUserById,
    updateUserById,
    getAllRoles
} from "services/user.service";



const getHomePage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const totalPages = await countTotalProductClientPages(8)


    const products = await getProducts(currentPage, 8);
    return res.render("client/home/show.ejs", {
        products,
        user: req.user ?? null,
        totalPages: +totalPages,
        page: +currentPage
    });
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

    await handleCreateUser(fullName, username, address, phone, avatar, role);

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
    const { id, fullName, phone, role, address } = req.body;

    const file = req.file;
    const avatar = file?.filename || "";

    await updateUserById(id, fullName, phone, role, address, avatar);

    return res.redirect("/admin/user");
};


const getProductFilterPages = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;
    const totalPages = await countTotalProductClientPages(6);
    const products = await getProducts(currentPage, 6);
    //  return res.render("client/product/filter.ejs" , {
    //     products ,
    //     totalPages : +totalPages,
    //     page : + currentPage
    //  })
     res.status(200).json({
        data : products
    })

}







export {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getViewUser,
    postUpdateUser,
    getProductFilterPages
}