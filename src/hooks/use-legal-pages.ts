import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useCreateLegalPageMutation,
  useUpdateLegalPageMutation,
  useCreatePageSectionMutation,
  useUpdatePageSectionMutation,
  useDeletePageSectionMutation,
} from "@/gql/generated"

export function useLegalPages() {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["GetLegalPages"] })
    queryClient.invalidateQueries({ queryKey: ["GetLegalPage"] })
  }

  const createPage = useCreateLegalPageMutation({
    onSuccess: () => {
      toast.success("Page créée")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la création de la page"),
  })

  const updatePage = useUpdateLegalPageMutation({
    onSuccess: () => {
      toast.success("Page mise à jour")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la mise à jour de la page"),
  })

  const createSection = useCreatePageSectionMutation({
    onSuccess: () => {
      toast.success("Section ajoutée")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la création de la section"),
  })

  const updateSection = useUpdatePageSectionMutation({
    onSuccess: () => {
      toast.success("Section mise à jour")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la mise à jour de la section"),
  })

  const deleteSection = useDeletePageSectionMutation({
    onSuccess: () => {
      toast.success("Section supprimée")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la suppression de la section"),
  })

  return {
    createPage: createPage.mutate,
    updatePage: updatePage.mutate,
    createSection: createSection.mutate,
    updateSection: updateSection.mutate,
    deleteSection: deleteSection.mutate,
    isPending:
      createPage.isPending ||
      updatePage.isPending ||
      createSection.isPending ||
      updateSection.isPending ||
      deleteSection.isPending,
  }
}
