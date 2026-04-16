import { NextFunction, Request, Response } from "express";
import{user}from'@prisma/client'

// Middleware kiểm tra đã login chưa (dùng cho login/register)
const isLogin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return res.redirect("/"); // đã login thì không cho vào login nữa
    }
    next();
};

// Middleware kiểm tra admin (đã bao gồm check login)
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // apply only to admin
    if (req.path.startsWith('/admin')) {
        const user = req.user;

        if (user?.role?.name === "ADMIN") {
            next();
        } else {
            res.render("status/403.ejs");
        }

        return;
    }

    // client routes
    next();
};

export {
    isLogin,
    isAdmin,
};