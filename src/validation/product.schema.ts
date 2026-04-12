import * as z from "zod";


export const ProductSchema = z.object({
    // trim là loại bỏ khoảng trắng ở đầu và cuối chuỗi, min(1) là yêu cầu chuỗi phải có ít nhất 1 ký tự sau khi đã được trim
    id : z.string().optional(),
    name: z.string().trim().min(1, { message: "Product name is required" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),
    detailDesc: z.string().trim().min(1, { message: "Detail description is required" }),
    shortDesc: z.string().trim().min(1, { message: "Short description is required" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num >= 0, {
            message: "Số lượng phải lớn hơn hoặc bằng 0",
        }),
    factory: z.string().trim().min(1, { message: "Factory is required" }),
    target: z.string().trim().min(1, { message: "Target is required" }),
});


export type TProductSchema = z.infer<typeof ProductSchema>;

