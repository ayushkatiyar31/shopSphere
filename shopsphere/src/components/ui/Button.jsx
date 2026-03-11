import React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm": variant === "default",
          "bg-indigo-100 text-indigo-900 hover:bg-indigo-200": variant === "secondary",
          "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 shadow-sm": variant === "outline",
          "hover:bg-gray-100 text-gray-700": variant === "ghost",
          "text-red-500 hover:bg-red-50": variant === "destructive-ghost",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3 text-sm": size === "sm",
          "h-11 rounded-lg px-8 text-lg": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
