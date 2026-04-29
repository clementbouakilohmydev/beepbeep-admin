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

  // "Rejeter" remet le doc en file d'attente côté back (pas d'état "rejected" sur les
  // documents, ils ont seulement pending → processing → verified). Le driver verra son
  // doc redevenir "à valider" et pourra renvoyer une nouvelle version.
  const reject = (id: string) =>
    mutate({ where: { id }, data: { state: DOCUMENT_STATE.PENDING } } as never)

  return { validate, reject, isPending }
}
