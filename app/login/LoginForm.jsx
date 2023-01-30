"use client";

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
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={setEmail}
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
              onChange={setPassword}
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
