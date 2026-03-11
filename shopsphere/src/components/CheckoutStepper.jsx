import { Check } from "lucide-react"
import { cn } from "../lib/utils"

function CheckoutStepper({ currentStep = 1 }) {
  const steps = [
    { id: 1, name: "Cart" },
    { id: 2, name: "Details" },
    { id: 3, name: "Payment" },
  ]

  return (
    <nav aria-label="Progress" className="mb-12 mt-4 flex justify-center w-full">
      <ol role="list" className="flex items-center w-full max-w-xl">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? "flex-1" : "", "relative")}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 shadow-sm z-10 transition-colors">
                  <Check className="h-4 w-4 text-white font-bold" aria-hidden="true" />
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                )}
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white shadow-sm z-10" aria-current="step">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                )}
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white z-10 transition-colors">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                </div>
              </>
            )}
            <span className={cn("absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap", step.id <= currentStep ? "text-indigo-600" : "text-gray-400")}>
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default CheckoutStepper
