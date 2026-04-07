import getConnection from "../config/database"

// Hàm tạo user mới
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string
) => {
    const connection = await getConnection();

    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];

        const [result] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Hàm lấy toàn bộ danh sách user
const getAllUsers = async () => {
    const connection = await getConnection();

    try {
        const [results] = await connection.query('SELECT * FROM `users`');
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// Hàm xóa user theo id
const handleDeleteUser = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [id];
        const [result] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Hàm xem chi tiết user theo id
const getUserById = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];
        const [result] = await connection.execute(sql, values);
        return result[0] ;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Hàm cập nhật user theo id
const updateUserById = async (id: string, email: string, address: string , fullName: string ) => {
    try {
        const connection = await getConnection();

        const sql = 'UPDATE `users` SET `name` = ? , `email` = ? , `address` = ? WHERE `id` = ? ';
        const values = [fullName, email, address, id];

        const [result, fields] = await connection.execute(sql, values);

        console.log(result);
        console.log(fields);
    } catch (err) {
        console.log(err);
    }
}

















export {
    handleCreateUser,
    getAllUsers,
    handleDeleteUser,
    getUserById,
    updateUserById
}