import Regulations from "../../../models/Regulations.js";

// Lấy tất cả quy định với phân trang, chỉ lấy quy định có status là true
const getAllRegulations = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const regulations = await Regulations.find({ status: true }) // Lọc theo status
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất

    const totalRegulations = await Regulations.countDocuments({ status: true }); // Đếm chỉ các quy định có status = true

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

// Xóa (cập nhật trạng thái) quy định theo ID
const deleteRegulation = async (id) => {
  try {
    const regulation = await Regulations.findById(id);

    if (!regulation) {
      throw new Error("Regulation not found");
    }

    // Cập nhật trạng thái thành false thay vì xóa
    regulation.status = false;
    await regulation.save();

    return regulation;
  } catch (error) {
    throw new Error("Error deleting regulation: " + error.message);
  }
};

const searchRegulationsByTitle = async (keyword = "", page = 1, limit = 10) => {
  try {
    console.log("Searching regulations with keyword:", keyword); // Debugging line
    const skip = (page - 1) * limit;

    let query = { status: true };
    if (keyword && keyword.trim() !== "") {
      query.title = { $regex: keyword, $options: "i" }; // Case-insensitive search
    }

    console.log("Query being executed:", query); // Debugging line

    const regulations = await Regulations.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalRegulations = await Regulations.countDocuments(query);

    return {
      regulations,
      total: totalRegulations,
      totalPages: Math.ceil(totalRegulations / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error searching regulations:", error); // Log the error
    throw new Error("Error searching regulations: " + error.message);
  }
};

export {
  getAllRegulations,
  createRegulation,
  updateRegulation,
  deleteRegulation,
  searchRegulationsByTitle,
};
