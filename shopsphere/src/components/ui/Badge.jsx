import React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        {
          "border-transparent bg-indigo-600 text-white shadow hover:bg-indigo-700": variant === "default",
          "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200": variant === "secondary",
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600": variant === "destructive",
          "text-gray-900 border-gray-200 bg-white hover:bg-gray-100": variant === "outline"
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
