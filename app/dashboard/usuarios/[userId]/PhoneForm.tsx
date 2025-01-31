import { Button } from "@/app/ui/components/Button";
import { TrashIcon } from "@/app/ui/components/Icons";
import { Input } from "@/app/ui/components/Input";
import { Label } from "@/app/ui/components/Label";
import { usePhone } from "./usePhone";
import { ConfirmModal } from "@/app/ui/components/ConfirmModal";
import { useRef } from "react";

export function PhoneForm({
  id,
  initialPhone,
}: {
  id: string;
  initialPhone?: string;
}) {
  const {
    phone,
    getPhone,
    handleUpdatePhone,
    handleDeletePhone,
    loadingUpdatePhone,
    loadingDeletePhone,
    updatePhoneErrorMessage,
    deletePhoneErrorMessage,
  } = usePhone();

  const deletePhoneModalRef = useRef<HTMLDialogElement>(null);

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
        <small>Teléfono</small>
      </legend>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <small>
          <b>
            <i>{initialPhone ? initialPhone : "No proporcionado"}</i>
          </b>
        </small>
        {initialPhone && (
          <>
            <Button
              type="button"
              title="Eliminar número de teléfono"
              onClick={() => deletePhoneModalRef.current?.showModal()}
              style={{
                display: "flex",
                padding: "0",
                border: "none",
              }}
              disabled={loadingDeletePhone}
            >
              <TrashIcon />
            </Button>
            <ConfirmModal
              ref={deletePhoneModalRef}
              text="¿Estás seguro deseas eliminar el número de teléfono?"
              onClose={async (e) => {
                if (e.currentTarget.returnValue === "cancel") return;
                await handleDeletePhone(id);
              }}
            />
            {deletePhoneErrorMessage && <p>{deletePhoneErrorMessage}</p>}
          </>
        )}
      </div>
      {phone !== undefined ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleUpdatePhone(id);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Label label="Teléfono" required={true}>
            <Input
              type="tel"
              name="phone"
              required={true}
              minLength={6}
              placeholder="+543482524950"
              value={phone}
              onChange={(e) => getPhone(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
          </Label>
          {updatePhoneErrorMessage && <p>{updatePhoneErrorMessage}</p>}
          <Button
            type="submit"
            label="Actualizar teléfono"
            disabled={loadingUpdatePhone}
          />
        </form>
      ) : (
        <Button
          type="button"
          label={initialPhone ? "Cambiar teléfono" : "Agregar teléfono"}
          onClick={() => getPhone("")}
        />
      )}
    </fieldset>
  );
}
