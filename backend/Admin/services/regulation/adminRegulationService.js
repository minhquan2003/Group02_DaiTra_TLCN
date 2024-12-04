import Regulations from "../../../models/Regulations.js";

// Lấy tất cả quy định với phân trang
const getAllRegulations = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const regulations = await Regulations.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất

    const totalRegulations = await Regulations.countDocuments();

    return {
      regulations,
      total: totalRegulations,
      totalPages: Math.ceil(totalRegulations / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error("Error fetching regulations: " + error.message);
  }
};

// Thêm quy định mới
const createRegulation = async (data) => {
  try {
    const regulation = new Regulations(data);
    return await regulation.save();
  } catch (error) {
    throw new Error("Error creating regulation: " + error.message);
  }
};

// Cập nhật quy định theo ID
const updateRegulation = async (id, data) => {
  try {
    const regulation = await Regulations.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!regulation) {
      throw new Error("Regulation not found");
    }

    return regulation;
  } catch (error) {
    throw new Error("Error updating regulation: " + error.message);
  }
};

// Xóa quy định theo ID
const deleteRegulation = async (id) => {
  try {
    const regulation = await Regulations.findByIdAndDelete(id);

    if (!regulation) {
      throw new Error("Regulation not found");
    }

    return regulation;
  } catch (error) {
    throw new Error("Error deleting regulation: " + error.message);
  }
};

export {
  getAllRegulations,
  createRegulation,
  updateRegulation,
  deleteRegulation,
};
