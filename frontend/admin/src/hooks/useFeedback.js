import { useEffect, useState } from "react";
import axios from "axios";

const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/all-feedback"
        );
        setFeedbacks(response.data.totalFeedbacks || 0);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };
    fetchData();
  }, []);

  return { feedbacks };
};

export default useFeedback;
