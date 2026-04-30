import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, useSearchParams } from "react-router";
import { Storage } from "../../core/Storage";
import { loginUser, register } from "../../api/auth/service";
import { useUserInformation } from "../../context/userInformationContext";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { set } = useUserInformation();

  const handleUpdateQuery = () => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", mode === "login" ? "register" : "login");
    setSearchParams(params);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    if (mode === "login") {
      const results = await loginUser({ username, password });

      if (results?.error) {
        setError("Please check your credential");
        setLoading(false);
        return;
      }

      const userData = results.data.user;
      Storage.set({ value: JSON.stringify(userData) });
      set({
        id: userData.id,
        username: userData.username,
      });
      navigate("/");
    } else {
      await register({ username, password });
      handleUpdateQuery();
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={"password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                required
              />
            </div>
          </div>
          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <p className={styles.registerText}>
          <span className={styles.registerLink} onClick={handleUpdateQuery}>
            {mode === "register" ? "Login" : "Register"} Instead
          </span>
        </p>
      </div>
    </div>
  );
}
