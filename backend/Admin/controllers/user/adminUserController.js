import {
  getCountByRole,
  getAllUsersExcludingRole,
  getCountExcludingRole,
  getUsersByRole,
  deleteUser,
  getCountBannedUsers,
  getBannedUsers,
  banUser,
  unbanUser,
  searchUsers,
  switchRole,
} from "../../services/user/adminUserService.js";

//--------Lấy tất cả người dùng trừ admin
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

//--------Lấy tất cả người dùng bị ban
const getAllBannedUsers = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 8;
    const skip = (page - 1) * limit;

    const totalBannedUsers = await getCountBannedUsers();
    const users = await getBannedUsers(skip, limit);

    res.status(200).json({
      totalBannedUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBannedUsers / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-------- Ban người dùng
const banUserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await banUser(userId);
    res.status(200).json({
      message: "User has been banned successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-------- Unban người dùng
const unbanUserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await unbanUser(userId);
    res.status(200).json({
      message: "User has been unbanned successfully",
      user: updatedUser,
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

//-----------Lấy tất cả người dùng yêu cầu làm partner
const getUsersWithRequestPartner = async (req, res) => {
  try {
    const { page = 1 } = req.query; // Lấy tham số page từ query, mặc định là 1
    const limit = 4; // Số lượng người dùng mỗi trang (split = 8)
    const skip = (page - 1) * limit;

    // Đếm tổng số người dùng có role là "partner"
    const totalPartners = await getCountByRole("regisPartner");

    // Lấy danh sách người dùng có role là "partner"
    let users = await getUsersByRole("regisPartner");

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

//-------- Tìm kiếm người dùng theo từ khóa
const searchUsersByKeyword = async (req, res) => {
  try {
    const { keyword } = req.query; // Lấy từ khóa từ query
    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const users = await searchUsers(keyword);

    res.status(200).json({
      totalResults: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chuyển từ regisPartner sang partner
const switchToPartner = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ params
    const updatedUser = await switchRole(userId, "regisPartner", "partner");

    res.status(200).json({
      message: "User role changed to 'partner' successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chuyển từ partner sang user
const switchPartnerToUser = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ params
    const updatedUser = await switchRole(userId, "partner", "user");

    res.status(200).json({
      message: "User role changed to 'user' successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chuyển từ regisPartner sang user
const switchToUser = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ params
    const updatedUser = await switchRole(userId, "regisPartner", "user");

    res.status(200).json({
      message: "User has been successfully switched to user role.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  getUsersWithPartnerRole,
  getBannedUsers,
  getAllBannedUsers,
  deleteUserAccount,
  banUserAccount,
  unbanUserAccount,
  searchUsersByKeyword,
  getUsersWithRequestPartner,
  switchToPartner,
  switchPartnerToUser,
  switchToUser,
};
