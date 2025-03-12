"use client"

import { useEffect, useState } from "react"

export function FloatingClouds() {
  const [clouds, setClouds] = useState<{ id: number; left: number; delay: number; size: number; speed: number }[]>([])

  useEffect(() => {
    // 5-8개의 구름 생성
    const cloudCount = Math.floor(Math.random() * 4) + 5
    const newClouds = []

    for (let i = 0; i < cloudCount; i++) {
      newClouds.push({
        id: i,
        left: Math.random() * 100, // 화면 가로 위치 (%)
        delay: Math.random() * 2, // 애니메이션 지연 시간
        size: Math.random() * 100 + 100, // 구름 크기 (100-200px)
        speed: Math.random() * 10 + 10, // 애니메이션 속도 (10-20s)
      })
    }

    setClouds(newClouds)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${cloud.left}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.speed}s`,
          }}
        >
          <div
            className="w-full h-full animate-float"
            style={{
              animationDuration: `${cloud.speed * 0.5}s`,
              animationDelay: `${cloud.delay * 0.5}s`,
            }}
          >
            <CloudSVG />
          </div>
        </div>
      ))}
    </div>
  )
}

function CloudSVG() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <path
        d="M168.5 78.5C168.5 96.4 154.1 111 136.5 111H46.5C28.9 111 14.5 96.4 14.5 78.5C14.5 60.6 28.9 46 46.5 46C47.7 46 48.9 46.1 50.1 46.2C54.6 28.5 71 15.5 90.5 15.5C112.1 15.5 129.9 31.7 131.4 52.4C132.4 52.1 133.4 52 134.5 52C153.1 52 168.5 63.9 168.5 78.5Z"
        fill="white"
        fillOpacity="0.85"
      />
      <path
        d="M185.5 63.5C185.5 81.4 171.1 96 153.5 96H63.5C45.9 96 31.5 81.4 31.5 63.5C31.5 45.6 45.9 31 63.5 31C64.7 31 65.9 31.1 67.1 31.2C71.6 13.5 88 0.5 107.5 0.5C129.1 0.5 146.9 16.7 148.4 37.4C149.4 37.1 150.4 37 151.5 37C170.1 37 185.5 48.9 185.5 63.5Z"
        fill="white"
        fillOpacity="0.9"
      />
    </svg>
  )
}

