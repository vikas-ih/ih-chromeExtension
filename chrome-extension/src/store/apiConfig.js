export const getAuthHeaders = (accessToken) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${accessToken}`,
});
