import { Request, Response } from "express";
import { countTotalOrderPages, getOrderAdmin } from "services/admin/order.service";
import { countTotalProductPages, getProductList } from "services/admin/product.services";
import { countTotaUserPages, getAllUsers } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {

    return res.render("admin/dashboard/show.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) { currentPage = 1 }

    const users = await getAllUsers(currentPage);
    const totalPages = await countTotaUserPages();
    return res.render("admin/user/show.ejs", {
        users: users,
        totalPages: +totalPages,
        page: + currentPage

    });
};

const getAdminProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) { currentPage = 1 }

    const totalPages = await countTotalProductPages();


    const products = await getProductList(currentPage);
    return res.render("admin/product/show.ejs", {
        products, 
        totalPages: +totalPages,
        page: + currentPage
    });
}

const getAdminOrderPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) { currentPage = 1 }

    const orders = await getOrderAdmin(currentPage)
    const totalPages = await countTotalOrderPages();


    return res.render("admin/order/show.ejs" , 
        {
            orders,
            totalPages: +totalPages,
            page: + currentPage
        }
    );
}





export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage }