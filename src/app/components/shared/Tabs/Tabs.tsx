'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function Tabs({ options, value, onChange }: Props) {

  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderStyle, setSliderStyle] = useState({
    width: 0,
    left: 0,
  })

  useEffect(() => {
    const activeButton = containerRef.current?.querySelector<HTMLButtonElement>(
      `.item.active`
    )

    if (activeButton) {
      setSliderStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      })
    }
  }, [value])

  return (
    <div className="wrapper" ref={containerRef}>
      <div
        className="slider"
        style={{
          width: sliderStyle.width,
          transform: `translateX(${sliderStyle.left}px)`,
        }}
      />

      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`item ${value === option ? 'active' : ''}`}
          type="button"
        >
          {option}
        </button>
      ))}

      <style jsx>{`
        .wrapper {
          position: relative;
          display: inline-flex;
          background: #f2f2f2;
          padding: 6px;
          border-radius: 14px;
          gap: 4px;
        }

        .item {
          position: relative;
          z-index: 2;
          border: none;
          background: transparent;
          padding: 8px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #555;
          font-weight: 500;
          transition: color 0.25s ease;
          white-space: nowrap;
        }

        .item:hover {
          color: #222;
        }

        .active {
          color: white;
        }

        .slider {
          position: absolute;
          top: 6px;
          bottom: 6px;
          left: 0;
          background: #5c5ac7;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
}