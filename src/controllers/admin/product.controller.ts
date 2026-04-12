import { Request, Response } from "express";
import { createProduct, handleDeleteProduct, updateProductByID } from "services/admin/product.services";
import { getProductById } from "services/client/item.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";



//  hiển thị trang tạo sản phẩm mới
const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: "",
    }
    return res.render('admin/product/create.ejs', { errors, oldData });
};

// xử lý logic khi tạo mới sản phẩm
const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map((item) => `${item.path[0]}: ${item.message}`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render('admin/product/create.ejs', { errors, oldData });

    }

    const image = req.file ? req.file.filename : null;
    await createProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);

    return res.redirect('/admin/product');
};

//  xoa sản phẩm
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    //  xóa sản phẩm ở đây
    await handleDeleteProduct(+id);
    return res.redirect('/admin/product');
}
//  lấy thông tin chi tiết sản phẩm
const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);

    const factoryOptions = [

        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ]

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];





    return res.render('admin/product/detail.ejs' , { product, factoryOptions, targetOptions }  );
}

// cap nhat san pham
const postUpdateProduct = async (req: Request, res: Response) => {
    const {
        id , name, price, detailDesc, shortDesc, quantity, factory, target  } = req.body as TProductSchema ;
        const image = req.file ? req.file.path : null;

        await updateProductByID(+id!, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);

    return res.render('/admin/product');
}






export { getAdminCreateProductPage, postAdminCreateProduct, postDeleteProduct, getViewProduct, postUpdateProduct   };