import { useState, useEffect } from "react";

const usePartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          "http://localhost:5555/admin/all-partners"
        );
        const data = await response.json();

        // Filter users with the role of 'partner'
        const partnerUsers = data.users.filter(
          (user) => user.role === "partner"
        );

        setPartners(partnerUsers);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return { partners, loading, error };
};

export default usePartners;
