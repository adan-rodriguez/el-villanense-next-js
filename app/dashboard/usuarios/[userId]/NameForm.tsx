import { Input } from "@/app/ui/components/Input";
import { Label } from "@/app/ui/components/Label";
import { useName } from "./useName";
import { Button } from "@/app/ui/components/Button";
import { FormLayout } from "./FormLayout";

export function NameForm({
  id,
  initialName,
}: {
  id: string;
  initialName?: string;
}) {
  const { name, getName, handleUpdateName, loading, errorMessage } = useName();

  return (
    <FormLayout legend="Nombre">
      <p>
        <small>
          <b>
            <i>{initialName || "Nombre no proporcionado"}</i>
          </b>
        </small>
      </p>
      {name !== undefined ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleUpdateName(id);
          }}
          style={{
            padding: "revert",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Label label="Nombre completo" required={true}>
            <Input
              name="name"
              value={name}
              required={true}
              onChange={(e) => getName(e.target.value)}
              onKeyDown={(e) => {
                if (e.currentTarget.value === "" && e.key === " ") {
                  e.preventDefault();
                }
              }}
            />
          </Label>
          {errorMessage && <p>{errorMessage}</p>}
          <Button type="submit" label="Actualizar nombre" disabled={loading} />
        </form>
      ) : (
        <Button
          type="button"
          label={initialName ? "Cambiar nombre" : "Agregar nombre"}
          onClick={() => {
            getName("");
          }}
        />
      )}
    </FormLayout>
  );
}
