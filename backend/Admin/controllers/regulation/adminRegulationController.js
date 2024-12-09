import {
  getAllRegulations,
  createRegulation,
  updateRegulation,
  deleteRegulation,
} from "../../services/regulation/adminRegulationService.js";

// Lấy tất cả quy định với phân trang
const getRegulations = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await getAllRegulations(parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.regulations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch regulations",
      error: error.message,
    });
  }
};

// Thêm quy định mới
const addRegulation = async (req, res) => {
  try {
    const regulation = await createRegulation(req.body);

    res.status(201).json({
      success: true,
      message: "Regulation created successfully",
      data: regulation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create regulation",
      error: error.message,
    });
  }
};

// Cập nhật quy định theo ID
const editRegulation = async (req, res) => {
  const { id } = req.params;
  try {
    const regulation = await updateRegulation(id, req.body);

    res.status(200).json({
      success: true,
      message: "Regulation updated successfully",
      data: regulation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update regulation",
      error: error.message,
    });
  }
};

// Xóa quy định theo ID
const removeRegulation = async (req, res) => {
  const { id } = req.params;
  try {
    const regulation = await deleteRegulation(id);

    res.status(200).json({
      success: true,
      message: "Regulation deleted successfully",
      data: regulation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete regulation",
      error: error.message,
    });
  }
};

export { getRegulations, addRegulation, editRegulation, removeRegulation };
