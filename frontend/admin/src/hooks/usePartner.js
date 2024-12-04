import { useEffect, useState } from "react";
import axios from "axios";

const usePartner = () => {
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/all-partners"
        );
        setPartners(response.data.length || 0);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      }
    };
    fetchData();
  }, []);

  return { partners };
};

export default usePartner;
