import { prisma } from "config/client";

// ================= USER FILTER =================
const userFilter = async (usernameInput: string) => {
    return await prisma.user.findMany({
        where: {
            username: {
                contains: usernameInput
            }
        }
    });
};

// ================= YÊU CẦU 1 =================
// lấy sp có giá trị tối thiểu bằng 1.000.000 
const yeuCau1 = async (minPrice: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: minPrice
            }
        }
    });
};

// ================= YÊU CẦU 2 =================
// yêu cầu 2 tối đa 15.000.000
const yeuCau2 = async (maxPrice: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                lte: maxPrice
            }
        }
    });
};

// ================= YÊU CẦU 3 =================
// tìm sp có tên là apple 
const yeuCau3 = async (factory: string) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                equals: factory
            }
        }
    });
};

// ================= YÊU CẦU 4 =================
const yeuCau4 = async (factoryArray: string[]) => {
    return await prisma.product.findMany({
        where: {
            factory: {
                in: factoryArray
            }
        }
    });
};

// ================= YÊU CẦU 5 =================
const yeuCau5 = async (min: number, max: number) => {
    return await prisma.product.findMany({
        where: {
            price: {
                gte: min,
                lte: max
            }
        }
    });
};

// ================= YÊU CẦU 6 =================
// nhiều khoảng giá khác nhau
const yeuCau6 = async () => {
    return await prisma.product.findMany({
        where: {
            OR: [
                { price: { gte: 10000000, lte: 15000000 } },
                { price: { gte: 16000000, lte: 20000000 } }
            ]
        }
    });
};

// ================= YÊU CẦU 7 =================
// sắp xếp giảm dần theo giá
const yeuCau7 = async () => {
    return await prisma.product.findMany({
        orderBy: {
            price: "asc"
        }
    });
};

// ================= FILTER FULL =================
const getProductWithFilter = async (
    page: number,
    pageSize: number,
    factory: string,
    target: string,
    price: string,
    sort: string,
) => {
    //  BILD WHERE QUERY
    let whereClause: any = {};

    if (factory) {
        const factoryInput = factory.split(",");
        whereClause.factory = {
           
                in: factoryInput
        
        };
    }

    if (target) {
        const targetInput = target.split(",");
        whereClause.target = {
            
                in: targetInput
            
        };
    }

    if (price) {
        const priceInput = price.split(",");
        // ["duoi-10-trieu" , "15-20-trieu" , "tren-20-trieu" ]

        const priceCondition = [];

        for (let i = 0; i < priceInput.length; i++) {
            if (priceInput[i] === "duoi-10-trieu") {
                priceCondition.push({ "price": { "lt": 10000000 } });
            }
            if (priceInput[i] === "10-15-trieu") {
                priceCondition.push({ "price": { "gte": 10000000, "lte": 15000000 } });
            }
            if (priceInput[i] === "15-20-trieu") {
                priceCondition.push({ "price": { "gte": 15000000, "lte": 20000000 } });
                
            }
            if (priceInput[i] === "tren-20-trieu") {
                priceCondition.push({ "price": { "gt": 20000000 } });
            }
        }

        whereClause.OR = priceCondition;
    }
    let orderByClause: any = {};

    if (sort === "gia-tang-dan") {
        orderByClause = { price: "asc" };
    }

    if (sort === "gia-giam-dan") {
        orderByClause = { price: "desc" };
    }
    const skip = (page -1) *pageSize ;

    const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
            skip: 0,
            take: pageSize,
            where: whereClause,
            orderBy: orderByClause

        }),
        prisma.product.count({ where: whereClause })
    ])
    const totalPages = Math.ceil(count /pageSize)
    return{products , totalPages}

};

export {
    userFilter,
    yeuCau1,
    yeuCau2,
    yeuCau3,
    yeuCau4,
    yeuCau5,
    yeuCau6,
    yeuCau7,
    getProductWithFilter
};