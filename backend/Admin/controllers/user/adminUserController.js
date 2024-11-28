import {
  getCountByRole,
  getAllUsersExcludingRole,
  getCountExcludingRole,
  getUsersByRole,
  deleteUser,
} from "../../services/user/adminUserService.js";

//--------Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const { page = 1 } = req.query; // Lấy trang từ query, mặc định là trang 1
    const limit = 8; // Số lượng user mỗi trang (split = 8)
    const skip = (page - 1) * limit;

    // Đếm tổng số người dùng không có role là "admin"
    const totalUsers = await getCountExcludingRole("admin");

    // Lấy danh sách người dùng không có role là "admin" với phân trang
    const users = await getAllUsersExcludingRole("admin", skip, limit);

    // Trả về dữ liệu gồm tổng số và danh sách người dùng
    res.status(200).json({
      totalUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-----------Lấy tất cả người dùng đang có role là partner
const getUsersWithPartnerRole = async (req, res) => {
  try {
    const { page = 1 } = req.query; // Lấy tham số page từ query, mặc định là 1
    const limit = 4; // Số lượng người dùng mỗi trang (split = 8)
    const skip = (page - 1) * limit;

    // Đếm tổng số người dùng có role là "partner"
    const totalPartners = await getCountByRole("partner");

    // Lấy danh sách người dùng có role là "partner"
    let users = await getUsersByRole("partner");

    // Áp dụng phân trang (sử dụng slice)
    users = users.slice(skip, skip + limit);

    // Trả về dữ liệu bao gồm tổng số và danh sách người dùng
    res.status(200).json({
      totalPartners,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPartners / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//---------Xóa tạm người dùng
const deleteUserAccount = async (req, res) => {
  try {
    const { id } = req.params; // Lấy `id` từ params
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUsersWithPartnerRole, deleteUserAccount };
