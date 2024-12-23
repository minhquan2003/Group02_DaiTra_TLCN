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

    // Use aggregation to fetch feedbacks along with user details
    const feedbacks = await Feedbacks.aggregate([
      {
        $lookup: {
          from: "users", // Collection name for Users
          localField: "user_id", // Field in Feedbacks
          foreignField: "_id", // Field in Users
          as: "userDetails", // Output array field
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // Allow feedbacks without matching users
        },
      },
      {
        $addFields: {
          username: { $ifNull: ["$userDetails.username", "Unknown User"] },
          avatar_url: { $ifNull: ["$userDetails.avatar_url", "default.png"] },
        },
      },
      {
        $project: {
          userDetails: 0, // Exclude the userDetails field from the result
        },
      },
      { $skip: skip }, // Pagination: Skip the first (page-1)*limit records
      { $limit: limit }, // Limit the number of records to 'limit'
    ]);

    // Count the total number of feedbacks
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
