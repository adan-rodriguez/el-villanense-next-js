import styles from "../styles/LoginForm.module.css";

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  login,
  loginErrorMessage,
}) {
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div>
          <label className={styles.form_label} htmlFor="email">
            Email
            <input
              className={styles.form_input}
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className={styles.form_label} htmlFor="password">
            Contraseña
            <input
              className={styles.form_input}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className={styles.form_btn} type="submit">
          Ingresar
        </button>
      </form>
      {loginErrorMessage && (
        <p className={styles.form_login_error_message} role="alert">
          Los datos ingresados son incorrectos
        </p>
      )}
    </>
  );
}
