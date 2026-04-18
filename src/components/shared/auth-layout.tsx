import type { ReactNode } from "react"

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-card lg:flex lg:items-center lg:justify-center">
        <img src="/icon.png" alt="BeepBeepCity" className="max-w-[60%]" />
      </div>
    </div>
  )
}
