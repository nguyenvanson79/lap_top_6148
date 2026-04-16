import { prisma } from "config/client" // import Prisma client để thao tác database
import { ACCOUNT_TYPE } from "config/constant" // import enum loại tài khoản
import { comparePassword, hashPassword } from "services/user.service" // import hàm hash & so sánh mật khẩu



// ================== CHECK EMAIL EXIST ==================
const isEmailExist = async (email: string) => {
    // tìm user theo username (ở đây username chính là email)
    const user = await prisma.user.findUnique({
        where: { username: email }
    })

    // nếu tồn tại user → trả về true
    if (user) {
        return true
    }
    return false ;

    // ⚠️ nếu không có → đang return undefined (nên sửa thành return false)
}



// ================== REGISTER USER ==================
const registerNewUser = async (fullName: string, email: string, password: string) => {

    // hash mật khẩu trước khi lưu DB (bảo mật)
    const newPassWord = await hashPassword(password)

    // tìm role USER trong bảng role
    const userRole = await prisma.role.findUnique({
        where: {
            name: 'USER'
        }
    })

    // nếu tìm thấy role
    if (userRole) {
        // tạo user mới trong database
        await prisma.user.create({
            data: {
                username: email,            // lưu email vào username
                password: newPassWord,       // lưu password đã hash
                fullName: fullName,         // lưu tên đầy đủ
                accountType: ACCOUNT_TYPE.SYSTEM, // loại tài khoản (SYSTEM)
                roleId: userRole.id           // gán role USER
            }
        })
    } else {
        // nếu không có role USER → báo lỗi
        throw new Error(" user role k tồn tại ")
    }
}


// Hàm lấy thông tin user và role theo id
const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true
        },
        omit: {
            password:true
        },
    });
    return user;
}




export {
    isEmailExist,     // kiểm tra email tồn tại
    registerNewUser,  // đăng ký user
    getUserWithRoleById, // xem chi tiết user theo id
}