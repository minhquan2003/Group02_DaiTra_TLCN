import Feedbacks from "../../../models/Feedbacks.js";

const getAllFeedbacks = async (page, limit) => {
  try {
    const feedbacks = await Feedbacks.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalFeedbacks = await Feedbacks.countDocuments();

    return {
      feedbacks,
      totalFeedbacks,
      totalPages: Math.ceil(totalFeedbacks / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error("Error fetching feedbacks: " + error.message);
  }
};

export { getAllFeedbacks };
