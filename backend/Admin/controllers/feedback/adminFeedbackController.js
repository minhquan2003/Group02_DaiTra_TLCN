import { getAllFeedbacks } from "../../services/feedback/adminFeedbackService.js";

const getFeedbacks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const feedbackData = await getAllFeedbacks(page, limit);

    res.status(200).json({
      success: true,
      totalFeedbacks: feedbackData.totalFeedbacks, // Tổng số feedback
      totalPages: feedbackData.totalPages,
      currentPage: feedbackData.currentPage,
      data: feedbackData.feedbacks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getFeedbacks };
