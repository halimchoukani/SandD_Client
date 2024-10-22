import { jwtDecode } from "jwt-decode";

async function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const response = await fetch(`/api/user/get/${decoded.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch user data");
    const userData = await response.json();
    return userData;
  } catch (err) {
    console.error("Failed to fetch user data", err);
    return null;
  }
}

export default getUser;
