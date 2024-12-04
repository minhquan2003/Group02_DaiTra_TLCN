import Users from "../../../models/Users.js";

//--------Đếm số lượng người dùng tất cả trừ admin
const getCountExcludingRole = async (excludedRole) => {
  try {
    const count = await Users.countDocuments({
      role: { $ne: excludedRole },
      status: true,
    });
    return count;
  } catch (error) {
    throw new Error("Error fetching count excluding role: " + error.message);
  }
};

//--------Lấy tất cả người dùng trừ admin
const getAllUsersExcludingRole = async (excludedRole, skip, limit) => {
  try {
    const users = await Users.find({
      role: { $ne: excludedRole },
      status: true,
    })
      .skip(skip)
      .limit(limit);
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

//--------Đếm số lượng người dùng theo role
const getCountByRole = async (role) => {
  try {
    const count = await Users.countDocuments({
      role,
      status: true,
    });
    return count;
  } catch (error) {
    throw new Error("Error fetching count by role: " + error.message);
  }
};

//--------Lấy tất cả người dùng đang có role là....
const getUsersByRole = async (role) => {
  try {
    const users = await Users.find({
      role,
      status: true,
    });
    return users;
  } catch (error) {
    throw new Error("Error fetching users by role: " + error.message);
  }
};

//--------Đếm số lượng người dùng bị ban
const getCountBannedUsers = async () => {
  try {
    const count = await Users.countDocuments({
      ban: true,
      status: true,
    });
    return count;
  } catch (error) {
    throw new Error("Error fetching count of banned users: " + error.message);
  }
};

//--------Lấy tất cả người dùng bị ban
const getBannedUsers = async (skip, limit) => {
  try {
    const users = await Users.find({
      ban: true,
      status: true,
    })
      .skip(skip)
      .limit(limit);
    return users;
  } catch (error) {
    throw new Error("Error fetching banned users: " + error.message);
  }
};

//-------- Ban người dùng
const banUser = async (userId) => {
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.ban = true; // Đặt trạng thái ban là true
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error banning user: " + error.message);
  }
};

//-------- Unban người dùng
const unbanUser = async (userId) => {
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.ban = false; // Đặt trạng thái ban là false
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error unbanning user: " + error.message);
  }
};

//---- Đổi role giữa partner và user
const toggleUserRole = async (userId) => {
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Chuyển đổi role
    user.role = user.role === "partner" ? "user" : "partner";
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error toggling user role: " + error.message);
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

// Fetch user by ID
const fetchUserById = async (userId) => {
  try {
    const user = await Users.findById(userId).select("name");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

export {
  getCountExcludingRole,
  getCountByRole,
  getAllUsersExcludingRole,
  getUsersByRole,
  deleteUser,
  getCountBannedUsers,
  getBannedUsers,
  unbanUser,
  banUser,
  toggleUserRole,
  fetchUserById,
};
