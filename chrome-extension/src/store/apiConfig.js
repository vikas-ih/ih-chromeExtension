export const getAuthHeaders = (accessToken) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${accessToken}`,
});


export const getAuthHeadersPdf = (accessToken) => ({
  "Content-Type": "application/json",
  Accept: "application/pdf",
  Authorization: `Bearer ${accessToken}`,
});

