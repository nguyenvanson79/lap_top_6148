import { prisma } from "config/client";
import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";
import { comparePassword } from "services/user.service";



// ================== CONFIG PASSPORT LOCAL ==================
const configPassportLocal = () => {

    // đăng ký strategy Local vào passport
    passport.use(
        new LocalStrategy({
            passReqToCallback: true
        },

            // hàm verify sẽ được gọi khi user login
            // username: giá trị input username
            // password: giá trị input password
            // callback: hàm trả kết quả cho passport
            async function verify(req, username, password, callback) {
                const { session } = req as any
                if (session?.messages?.length) {
                    session.messages = [];
                }
                // tìm user trong database theo username
                const user = await prisma.user.findUnique({
                    where: { username }
                })

                // nếu không tìm thấy user → trả về lỗi cho passport
                if (!user) {
                    return callback(null, false, { message: `username : ${username} not found` });
                }

                // so sánh mật khẩu nhập vào với mật khẩu trong DB (đã hash)
                const isMath = await comparePassword(password, user.password);

                // nếu mật khẩu sai → trả về lỗi
                if (!isMath) {
                    return callback(null, false, { message: `k hợp lệ ` });
                }

                // nếu đúng → đăng nhập thành công, trả về user
                return callback(null, user as any);
            }

        )
    );

    // Lưu thông tin user vào session (chỉ lưu dữ liệu cần thiết)
    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    // Lấy thông tin user từ session và gắn vào req.user
    passport.deserializeUser(async function (user: any, callback) {
        try {
            const { id } = user;
            const userInDB: any= await getUserWithRoleById(id);
            const sumCart = await getUserSumCart(id)
            console.log(sumCart)
            return callback(null, { ...userInDB  , sumCart : sumCart});
        } catch (error) {
            return callback(error as Error);
        }
    });

}


export default configPassportLocal;