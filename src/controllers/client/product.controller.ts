import { Request, Response } from "express";
import { getProductById } from "services/client/item.service";

// hiển thị trang chi tiết sản phẩm ở client
const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render("client/product/detail.ejs", { product });
}

export { getProductPage }