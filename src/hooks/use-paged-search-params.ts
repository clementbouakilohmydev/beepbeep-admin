import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "@/hooks/use-debounce"

export function usePagedSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  const page = Math.max(1, Number(searchParams.get("page") || "1"))

  const updateParams = (
    updates: Record<string, string | null>,
    resetPage = false
  ) => {
    const params = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key)
      else params.set(key, value)
    }
    if (resetPage) params.delete("page")
    setSearchParams(params, { replace: true })
  }

  const setPage = (newPage: number) => {
    updateParams({ page: newPage <= 1 ? null : String(newPage) })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    if (page > 1) updateParams({ page: null })
  }

  return {
    searchParams,
    page,
    search,
    debouncedSearch,
    updateParams,
    setPage,
    handleSearchChange,
  }
}
