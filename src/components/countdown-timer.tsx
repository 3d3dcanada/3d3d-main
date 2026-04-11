'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetDate: string // ISO string
  label?: string
  accent?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer({ targetDate, label, accent = '#40C4C4' }: CountdownTimerProps) {
  const target = new Date(targetDate)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(target))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const blocks = [
    { value: timeLeft.days, unit: 'days' },
    { value: timeLeft.hours, unit: 'hrs' },
    { value: timeLeft.minutes, unit: 'min' },
    { value: timeLeft.seconds, unit: 'sec' },
  ]

  return (
    <div className="countdown" style={{ '--countdown-accent': accent } as React.CSSProperties}>
      {label && <p className="countdown__label">{label}</p>}
      <div className="countdown__blocks">
        {blocks.map((block) => (
          <div key={block.unit} className="countdown__block">
            <span className="countdown__value">{String(block.value).padStart(2, '0')}</span>
            <span className="countdown__unit">{block.unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
