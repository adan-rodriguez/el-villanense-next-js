"use client";

export default function LoginForm({
  email,
  password,
  handleChangeEmail,
  handleChangePassword,
  handleSubmit,
  loginErrorMessage,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Contraseña
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </label>
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {loginErrorMessage && (
        <p role="alert">Los datos ingresados son incorrectos</p>
      )}
    </>
  );
}
