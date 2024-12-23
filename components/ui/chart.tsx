/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ComponentProps, forwardRef } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"

export function ChartContainer({
  children,
  config,
  className,
}: {
  children: React.ReactNode
  config: Record<string, { label: string; color: string }>
  className?: string
}) {
  // Create CSS variables for chart colors
  const style = {} as Record<string, string>
  Object.entries(config).forEach(([key, value]) => {
    style[`--color-${key}`] = value.color
  })

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export const ChartTooltip = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<typeof Tooltip>, "content"> & {
    content?: ComponentProps<typeof Tooltip>["content"]
  }
>(({ content = <ChartTooltipContent />, ...props }, ref) => (
  <Tooltip {...props} content={content} wrapperStyle={{ outline: "none" }} />
))
ChartTooltip.displayName = "ChartTooltip"

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  hideLabel = false,
}: TooltipProps<any, any> & {
  formatter?: (value: any, name: any) => React.ReactNode
  labelFormatter?: (label: any) => React.ReactNode
  hideLabel?: boolean
}) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="grid gap-2">
          <div className="text-xs text-muted-foreground">
            {labelFormatter ? labelFormatter(label) : label}
          </div>
        </div>
      )}
      <div className="grid gap-2">
        {payload.map(({ value, name }: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-2">
            {formatter ? formatter(value, name) : <div className="font-medium">{value}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

