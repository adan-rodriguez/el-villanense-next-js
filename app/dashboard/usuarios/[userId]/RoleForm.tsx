import { Role } from "@/app/lib/types";
import { Button } from "@/app/ui/components/Button";
import { useRole } from "./useRole";
import { ROLES } from "@/app/lib/utils";

export function RoleForm({
  id,
  initialRole,
}: {
  id: string;
  initialRole?: Role;
}) {
  const { role, getRole, handleUpdateRole, loading, errorMessage } = useRole();

  return (
    <fieldset
      style={{
        padding: "revert",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <legend
        style={{
          padding: "revert",
        }}
      >
        <small>Rol</small>
      </legend>
      <p>
        <small>
          <b>
            <i>{initialRole ? ROLES[initialRole] : "Rol no establecido"}</i>
          </b>
        </small>
      </p>
      {role !== undefined ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleUpdateRole(id);
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <label style={{ border: "1px solid gray", padding: "5px" }}>
              <input
                type="radio"
                name="role"
                value="editor"
                defaultChecked={initialRole === "editor"}
                onChange={() => getRole("editor")}
                style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
                required // Si cualquier botón de radio en un grupo con el mismo nombre tiene el atributo required, un botón de ese grupo debe estar seleccionado, aunque no tiene que ser necesariamente el que tiene aplicado el atributo.
              />
              <small>Editor</small>
            </label>
            <label style={{ border: "1px solid gray", padding: "5px" }}>
              <input
                type="radio"
                name="role"
                value="superadmin"
                defaultChecked={initialRole === "superadmin"}
                onChange={() => getRole("superadmin")}
                style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
              />
              <small>Superadministrador</small>
            </label>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <Button type="submit" label="Actualizar rol" disabled={loading} />
        </form>
      ) : (
        <Button
          type="button"
          label={initialRole ? "Cambiar rol" : "Agregar rol"}
          onClick={() => getRole(initialRole || "editor")}
        />
      )}
    </fieldset>
  );
}
