import { logout } from "../utils/logout.js";
const logoutBtn = document.querySelector("[data-logout]");

// LOGOUT

logoutBtn.addEventListener("click", () => {
  logout();
});
