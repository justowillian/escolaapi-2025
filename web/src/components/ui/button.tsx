import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Azul principal
        default: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-300",
        
        // Erro / alerta
        destructive:
          "bg-red-500 text-white hover:bg-red-400 focus-visible:ring-red-400/50 dark:bg-red-600",

        // Contorno com azul
        outline:
          "border-blue-500 bg-blue-50 text-blue-900 hover:bg-blue-100 dark:bg-blue-700 dark:border-blue-500 dark:text-blue-200 dark:hover:bg-blue-600",

        // Secundário neutro (cinza escuro)
        secondary:
          "bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400",

        // Ghost: texto e hover leve
        ghost:
          "hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-blue-300 dark:hover:text-white",

        // Link estilizado
        link: "text-blue-600 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
