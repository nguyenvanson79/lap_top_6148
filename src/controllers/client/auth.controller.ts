import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";


const getLoginPage = (req: Request, res: Response) => {
    const session = req.session as any;
    const rawMessages = session?.messages ?? session?.message ?? [];
    const messages = Array.isArray(rawMessages)
        ? rawMessages
        : rawMessages
            ? [String(rawMessages)]
            : [];

    if (session?.messages) session.messages = [];
    if (session?.message) session.message = [];

    res.render("client/auth/login.ejs", {
        messages,
        oldData: {
            username: "",
        },
    });
}

const getRegisterPage = (req: Request, res: Response) => {
    res.render("client/auth/register.ejs", {
        errors: [],
        oldData: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
}

const postLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: { message?: string }) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).render("client/auth/login.ejs", {
                messages: [info?.message || "Dang nhap that bai"],
                oldData: {
                    username: req.body?.username || "",
                },
            });
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) return next(loginErr);
            return res.redirect("/");
        });
    })(req, res, next);
}

const postRegister = async (req: Request, res: Response) => {
    const {fullName , email , password  , confirmPassword} = req.body as TRegisterSchema
const validate = await  RegisterSchema.safeParseAsync(req.body);

if (!validate.success) {

    // lỗi 
    const errorsZod = validate.error.issues ;
    const errors =  errorsZod?.map(item => `${item.message} (${item.path[0]})`)

    const oldData = {
        fullName , 
        email , 
        password ,
        confirmPassword
    }
    return res.render("client/auth/register.ejs" , {
        errors , oldData
    })

    }

    await registerNewUser( fullName , email , password )
    return res.redirect("/login")
}

export {
    getLoginPage,
    postLogin,
    getRegisterPage,
    postRegister
}