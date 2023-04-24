export const logout = () => {
  sessionStorage.removeItem("tokenAuth");
  window.location = "../index.html";
};
