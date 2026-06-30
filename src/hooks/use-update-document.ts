import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useUpdateDrivingLicenseMutation,
  useUpdateInsuranceMutation,
  useUpdateRegistrationDocumentMutation,
  useUpdateCertificateMutation,
} from "@/gql/generated"
import { DOCUMENT_LABELS, type DocumentType } from "@/lib/constants"
import { DOCUMENT_STATE } from "@/validation/document"

function useMutationFor(
  type: DocumentType,
  onSuccess: () => void,
  onError: () => void
) {
  const options = { onSuccess, onError }

  const dl = useUpdateDrivingLicenseMutation(
    type === "drivingLicense" ? options : undefined
  )
  const ins = useUpdateInsuranceMutation(
    type === "insurance" ? options : undefined
  )
  const rd = useUpdateRegistrationDocumentMutation(
    type === "registrationDocument" ? options : undefined
  )
  const cert = useUpdateCertificateMutation(
    type === "certificate" ? options : undefined
  )

  const map = {
    drivingLicense: dl,
    insurance: ins,
    registrationDocument: rd,
    certificate: cert,
  }

  return map[type]
}

export function useUpdateDocument(type: DocumentType) {
  const queryClient = useQueryClient()
  const label = DOCUMENT_LABELS[type]

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["GetUser"] })
    queryClient.invalidateQueries({ queryKey: ["GetUsers"] })
  }

  const { mutate, isPending } = useMutationFor(
    type,
    () => {
      invalidate()
      toast.success(`${label} mis à jour`)
    },
    () => toast.error("Erreur lors de la mise à jour")
  )

  const validate = (id: string) =>
    mutate({ where: { id }, data: { state: DOCUMENT_STATE.VERIFIED } } as never)

  // "Rejeter" passe le doc en `rejected`. Le driver est notifié et doit
  // ré-uploader sa pièce. Au prochain upload, le model back conserve
  // `previousPicture` → permet à l'admin de voir l'ancienne et la nouvelle
  // côte à côte (diff visuel) sans avoir à mémoriser pourquoi il avait
  // rejeté. Cf models/{DrivingLicense,Insurance,Certificate,
  // RegistrationDocument}.ts hook resolveInput.
  const reject = (id: string) =>
    mutate({ where: { id }, data: { state: DOCUMENT_STATE.REJECTED } } as never)

  return { validate, reject, isPending }
}
