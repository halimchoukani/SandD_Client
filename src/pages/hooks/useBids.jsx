import { useEffect, useState } from "react";

function useBids(userId) {
  const [bids, setBids] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // Don't fetch if userId is not provided

    setLoading(true);
    const fetchBids = async () => {
      try {
        const response = await fetch(`/api/bids/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch bids");

        const data = await response.json();
        setBids(data.reverse());
      } catch (err) {
        console.error("Failed to fetch bids", err);
        setError("Failed to fetch bids");
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, [userId]);

  return { bids, loading, error };
}

export default useBids;
