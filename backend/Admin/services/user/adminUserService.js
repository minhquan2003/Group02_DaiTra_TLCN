import Users from "../../../models/Users.js";

//--------Đếm số lượng người dùng tất cả trừ admin
const getCountExcludingRole = async (excludedRole) => {
  try {
    const count = await Users.countDocuments({ role: { $ne: excludedRole } });
    return count;
  } catch (error) {
    throw new Error("Error fetching count excluding role: " + error.message);
  }
};

//--------Lấy tất cả người dùng trừ admin
const getAllUsersExcludingRole = async (excludedRole, skip, limit) => {
  try {
    const users = await Users.find({ role: { $ne: excludedRole } })
      .skip(skip)
      .limit(limit);
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

//--------Đếm số lượng người dùng theo rule
const getCountByRole = async (role) => {
  try {
    const count = await Users.countDocuments({ role });
    return count;
  } catch (error) {
    throw new Error("Error fetching count by role: " + error.message);
  }
};

//--------Lấy tất cả người dùng đang có role là....
const getUsersByRole = async (role) => {
  try {
    const users = await Users.find({ role });
    return users;
  } catch (error) {
    throw new Error("Error fetching users by role: " + error.message);
  }
};

//--------Xóa tạm người dùng
const deleteUser = async (userId) => {
  try {
    const result = await Users.findByIdAndUpdate(
      userId,
      { status: false },
      { new: true } // Trả về document đã được cập nhật
    );
    return result;
  } catch (error) {
    throw new Error("Error deactivating user: " + error.message);
  }
};

export {
  getCountExcludingRole,
  getCountByRole,
  getAllUsersExcludingRole,
  getUsersByRole,
  deleteUser,
};
