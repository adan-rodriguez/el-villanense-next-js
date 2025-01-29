import { Input } from "@/app/ui/components/Input";
import { Label } from "@/app/ui/components/Label";
import { Button } from "@/app/ui/components/Button";
import { FormLayout } from "./FormLayout";
import { useEmail } from "./useEmail";

export function EmailForm({
  id,
  initialEmail,
}: {
  id: string;
  initialEmail?: string;
}) {
  const { email, getEmail, handleUpdateEmail, loading, errorMessage } =
    useEmail();

  return (
    <FormLayout legend="Email">
      <p>
        <small>
          <b>
            <i>{initialEmail || "Email no proporcionado"}</i>
          </b>
        </small>
      </p>
      {email !== undefined ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleUpdateEmail(id);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Label label="Email" required={true}>
            <Input
              name="email"
              type="email"
              value={email}
              required={true}
              onChange={(e) => getEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
          </Label>
          {errorMessage && <p>{errorMessage}</p>}
          <Button type="submit" label="Actualizar email" disabled={loading} />
        </form>
      ) : (
        initialEmail &&
        email === undefined && (
          <Button
            type="button"
            label={initialEmail ? "Cambiar email" : "Agregar email"}
            onClick={() => {
              getEmail("");
            }}
          />
        )
      )}
    </FormLayout>
  );
}
