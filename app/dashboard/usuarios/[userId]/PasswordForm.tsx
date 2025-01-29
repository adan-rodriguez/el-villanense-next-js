import { Label } from "@/app/ui/components/Label";
import { FormLayout } from "./FormLayout";
import { Input } from "@/app/ui/components/Input";
import { Button } from "@/app/ui/components/Button";
import { usePassword } from "./usePassword";

export function PasswordForm({ id }: { id: string }) {
  const {
    password,
    getPassword,
    repeatedPassword,
    getRepeatedPassword,
    loading,
    errorMessage,
    handleUpdatePassword,
  } = usePassword();

  return (
    <FormLayout legend="Contraseña">
      {password !== undefined && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePassword(id);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Label label="Nueva contraseña" required={true}>
            <small>
              <em>Mínimo: 6 caracteres</em>
            </small>
            <Input
              type="password"
              name="password"
              value={password}
              required={true}
              minLength={6}
              autoComplete="new-password" // En algunos casos, el navegador continuará sugiriendo valores de autocompletado incluso si el atributo autocompletar está desactivado. Este comportamiento inesperado puede resultar bastante confuso para los desarrolladores. El truco para realmente no aplicar el autocompletado es asignar un valor no válido al atributo, por ejemplo: autocomplete="nope". Dado que este valor no es válido para el atributo autocompletar, el navegador no tiene forma de reconocerlo y deja de intentar autocompletarlo.
              onChange={(e) => getPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
          </Label>
          <Label label="Repetir contraseña" required={true}>
            <Input
              type="password"
              name="repeatedPassword"
              value={repeatedPassword}
              required={true}
              minLength={6}
              onChange={(e) => getRepeatedPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
          </Label>
          {errorMessage && <p>{errorMessage}</p>}
          <Button
            type="submit"
            label="Actualizar contraseña"
            disabled={loading}
          />
        </form>
      )}
      {password === undefined && (
        <Button
          type="button"
          label="Cambiar contraseña"
          onClick={() => {
            getPassword("");
            getRepeatedPassword("");
          }}
        />
      )}
    </FormLayout>
  );
}
