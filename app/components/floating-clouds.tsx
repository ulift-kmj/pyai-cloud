'use client';

import { useEffect, useState } from 'react';

interface FloatingCloudsProps {
  scrollY: number; // 스크롤 위치를 props로 받음
}

export function FloatingClouds({ scrollY }: FloatingCloudsProps) {
  const [clouds, setClouds] = useState<
    {
      id: number;
      left: number;
      initialBottom: number; // 초기 bottom 위치 저장
      size: number;
      speed: number;
      zIndex: number;
      opacity: number;
      parallaxFactor: number; // 패럴랙스 효과 강도 (각 구름마다 다르게)
      animationDelay: number; // 애니메이션 지연 시간 추가
    }[]
  >([]);

  useEffect(() => {
    // 구름 개수 지정
    const cloudCount = Math.floor(Math.random() * 11) + 100;
    const newClouds = [];

    for (let i = 0; i < cloudCount; i++) {
      // 구름 크기 다양화: 30%는 매우 큰 구름, 40%는 큰 구름, 30%는 중간 크기 구름
      let size;
      const sizeRandom = Math.random();

      if (sizeRandom < 0.3) {
        // 매우 큰 구름 (600-900px)
        size = Math.random() * 300 + 600;
      } else if (sizeRandom < 0.7) {
        // 큰 구름 (400-600px)
        size = Math.random() * 200 + 400;
      } else {
        // 중간 크기 구름 (250-400px)
        size = Math.random() * 150 + 250;
      }

      // 구름을 화면 전체에 분산시키기 위해 초기 위치를 다양하게 설정
      newClouds.push({
        id: i,
        left: Math.random() * 100, // 0-100% 사이의 가로 위치
        initialBottom: Math.random() * 120 - 20, // -20% ~ 100% 사이의 세로 위치 (화면 밖에서부터 시작)
        size: size,
        speed: Math.random() * 10 + 15, // 애니메이션 속도 (15-25s)
        zIndex: Math.floor(Math.random() * 10), // 구름 겹침 효과
        opacity: Math.random() * 0.3 + 0.6, // 구름 투명도 (0.6-0.9)
        parallaxFactor: Math.random() * 0.5 + 0.3, // 패럴랙스 효과 강도 (0.3-0.8)
        animationDelay: Math.random() * 1.5, // 0-1.5초 사이의 지연 시간
      });
    }

    setClouds(newClouds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-0 animate-fade-in">
      {clouds.map((cloud) => {
        // 스크롤 위치에 따라 구름의 위치 계산
        // parallaxFactor가 클수록 더 빨리 움직임
        const bottomPosition =
          cloud.initialBottom + scrollY * cloud.parallaxFactor;

        return (
          <div
            key={cloud.id}
            className="absolute animate-cloud-rise-initial"
            style={{
              left: `${cloud.left}%`,
              bottom: `${bottomPosition}%`,
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              zIndex: cloud.zIndex,
              transition: 'bottom 0.1s ease-out', // 부드러운 움직임을 위한 트랜지션
              animationDelay: `${cloud.animationDelay}s`, // 각 구름마다 다른 지연 시간
            }}
          >
            <div
              className="w-full h-full animate-cloud-float"
              style={{
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <CloudSVG opacity={cloud.opacity} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CloudSVG({ opacity = 0.9 }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-lg"
    >
      <path
        d="M168.5 78.5C168.5 96.4 154.1 111 136.5 111H46.5C28.9 111 14.5 96.4 14.5 78.5C14.5 60.6 28.9 46 46.5 46C47.7 46 48.9 46.1 50.1 46.2C54.6 28.5 71 15.5 90.5 15.5C112.1 15.5 129.9 31.7 131.4 52.4C132.4 52.1 133.4 52 134.5 52C153.1 52 168.5 63.9 168.5 78.5Z"
        fill="white"
        fillOpacity={opacity}
      />
      <path
        d="M185.5 63.5C185.5 81.4 171.1 96 153.5 96H63.5C45.9 96 31.5 81.4 31.5 63.5C31.5 45.6 45.9 31 63.5 31C64.7 31 65.9 31.1 67.1 31.2C71.6 13.5 88 0.5 107.5 0.5C129.1 0.5 146.9 16.7 148.4 37.4C149.4 37.1 150.4 37 151.5 37C170.1 37 185.5 48.9 185.5 63.5Z"
        fill="white"
        fillOpacity={opacity}
      />
    </svg>
  );
}
