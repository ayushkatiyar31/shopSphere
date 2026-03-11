import { createContext, useState, useCallback, Fragment } from "react"
import { CheckCircle2, XCircle, Info, X } from "lucide-react"
import { cn } from "../lib/utils"

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, description, type = "success", duration = 3000 }) => {
    const id = Date.now().toString()
    setToasts((currentToasts) => [...currentToasts, { id, title, description, type, duration }])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 w-full max-w-sm pointer-events-none md:bottom-6 md:right-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex w-full items-start gap-3 rounded-lg p-4 shadow-lg ring-1 ring-black/5 animate-slide-in-right",
              {
                "bg-white text-gray-900": true,
              }
            )}
          >
            {toast.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />}
            {toast.type === "error" && <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
            {toast.type === "info" && <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}
            
            <div className="flex-1 flex flex-col pt-0.5">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description && <p className="mt-1 text-sm text-gray-500">{toast.description}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 inline-flex shrink-0 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
