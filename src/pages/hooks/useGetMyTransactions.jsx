import { useState, useEffect, useContext } from "react";
import { Context } from "../../App";

function useGetMyTransactions() {
  // Extract user and authentication state from the context
  const { user } = useContext(Context);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setTransactions([]); // Set an empty array if no user is logged in
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/transaction/get/transporter/${user.id}`);
        if (!response.ok) throw new Error("No transactions available");
        const data = await response.json();
        setTransactions(data.reverse()); // Reverse if necessary, else adjust according to data structure
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("There are no transactions available");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.id]); // Only refetch if user ID changes

  return { transactions, setTransactions, loading, error };
}

export default useGetMyTransactions;
