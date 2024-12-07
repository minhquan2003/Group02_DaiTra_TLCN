// import Feedbacks from "../../../models/Feedbacks.js";

// const getAllFeedbacks = async (page, limit) => {
//   try {
//     const feedbacks = await Feedbacks.find()
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     const totalFeedbacks = await Feedbacks.countDocuments();

//     return {
//       feedbacks,
//       totalFeedbacks,
//       totalPages: Math.ceil(totalFeedbacks / limit),
//       currentPage: page,
//     };
//   } catch (error) {
//     throw new Error("Error fetching feedbacks: " + error.message);
//   }
// };

// export { getAllFeedbacks };

import Feedbacks from "../../../models/Feedbacks.js";
import Users from "../../../models/Users.js"; // Make sure to import the Users model

const getAllFeedbacks = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    // Fetch feedbacks with pagination
    const feedbacks = await Feedbacks.find().skip().limit(limit).lean();

    // Fetch Category and User names
    for (const feedback of feedbacks) {
      const user = await Users.findById(feedback.user_id);
      feedback.username = user?.username || "Unknown User";
      feedback.avatar_url = user?.avatar_url || "default.png";
    }

    const totalFeedbacks = await Feedbacks.countDocuments();

    return {
      success: true,
      totalFeedbacks,
      totalPages: Math.ceil(totalFeedbacks / limit),
      currentPage: page,
      feedbacks,
    };
  } catch (error) {
    throw new Error("Error fetching feedbacks: " + error.message);
  }
};

export { getAllFeedbacks };
