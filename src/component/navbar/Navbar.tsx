import { useUserInformation } from "../../context/userInformationContext";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { Storage } from "../../core/Storage";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, set } = useUserInformation();
  const username = user?.username;

  const handleLoginClick = () => {
    navigate("/auth?mode=login");
  };

  const handleLogout = async () => {
    set(null);
    Storage.clear();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarActions}>
        {username ? (
          <div className={styles.navbarUser}>
            <div>{username}</div>
            <button
              style={{ backgroundColor: "red" }}
              type="button"
              className={styles.loginButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.loginButton}
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
