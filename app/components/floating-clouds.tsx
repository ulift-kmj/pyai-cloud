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
      shadowColor: string; // 그림자 색상 추가
      shadowIntensity: number; // 그림자 강도 추가
      animationType: string; // 애니메이션 타입 추가
    }[]
  >([]);

  useEffect(() => {
    // 구름 개수 지정
    const cloudCount = Math.floor(Math.random() * 11) + 70;
    const newClouds = [];

    // 그림자 색상 옵션
    const shadowColors = [
      'rgba(0, 0, 100, 0.2)', // 파란색 그림자
      'rgba(100, 0, 100, 0.2)', // 보라색 그림자
      'rgba(0, 0, 0, 0.15)', // 검은색 그림자
    ];

    // 애니메이션 타입 옵션
    const animationTypes = [
      'float',
      'pulse',
      'rotate',
      'float-rotate',
      'float-pulse',
    ];

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

      // 구름 간의 간격을 더 넓게 조정하여 겹침 현상 감소
      newClouds.push({
        id: i,
        left: Math.random() * 100, // 0-100% 사이의 가로 위치
        initialBottom: Math.random() * 150 - 50, // -50% ~ 100% 사이로 더 넓게 분산
        size: size,
        speed: Math.random() * 10 + 15, // 애니메이션 속도 (15-25s)
        zIndex: Math.floor(Math.random() * 10), // 구름 겹침 효과
        opacity: Math.random() * 0.2 + 0.75, // 구름 투명도 (0.75-0.95)로 조정하여 더 선명하게
        parallaxFactor: Math.random() * 0.5 + 0.3, // 패럴랙스 효과 강도 (0.3-0.8)
        animationDelay: Math.random() * 1.5, // 0-1.5초 사이의 지연 시간
        shadowColor:
          shadowColors[Math.floor(Math.random() * shadowColors.length)],
        shadowIntensity: Math.random() * 0.3 + 0.7, // 0.7-1.0 사이의 그림자 강도
        animationType:
          animationTypes[Math.floor(Math.random() * animationTypes.length)],
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

        // 애니메이션 클래스 결정
        let animationClass = 'animate-cloud-rise-initial';
        let innerAnimationClass = '';

        switch (cloud.animationType) {
          case 'float':
            innerAnimationClass = 'animate-cloud-float';
            break;
          case 'pulse':
            innerAnimationClass = 'animate-cloud-pulse';
            break;
          case 'rotate':
            innerAnimationClass = 'animate-cloud-rotate';
            break;
          case 'float-rotate':
            innerAnimationClass = 'animate-cloud-float animate-cloud-rotate';
            break;
          case 'float-pulse':
            innerAnimationClass = 'animate-cloud-float animate-cloud-pulse';
            break;
          default:
            innerAnimationClass = 'animate-cloud-float';
        }

        return (
          <div
            key={cloud.id}
            className={`absolute ${animationClass}`}
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
              className={`w-full h-full ${innerAnimationClass}`}
              style={{
                animationDuration: `${3 + Math.random() * 2}s`,
                filter: `drop-shadow(0 4px 6px ${cloud.shadowColor})`,
              }}
            >
              <CloudSVG
                opacity={cloud.opacity}
                shadowIntensity={cloud.shadowIntensity}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CloudSVG({ opacity = 0.9, shadowIntensity = 0.8 }) {
  // 그림자 효과를 위한 필터 ID 생성
  const filterId = `cloud-shadow-${Math.random().toString(36).substr(2, 9)}`;

  // 랜덤하게 구름 모양 선택 (3가지 다른 모양)
  const cloudType = Math.floor(Math.random() * 3);

  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={shadowIntensity} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {cloudType === 0 && (
        <g filter={`url(#${filterId})`}>
          <path
            d="M168.5 78.5C168.5 96.4 154.1 111 136.5 111H46.5C28.9 111 14.5 96.4 14.5 78.5C14.5 60.6 28.9 46 46.5 46C47.7 46 48.9 46.1 50.1 46.2C54.6 28.5 71 15.5 90.5 15.5C112.1 15.5 129.9 31.7 131.4 52.4C132.4 52.1 133.4 52 134.5 52C153.1 52 168.5 63.9 168.5 78.5Z"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
          <path
            d="M185.5 63.5C185.5 81.4 171.1 96 153.5 96H63.5C45.9 96 31.5 81.4 31.5 63.5C31.5 45.6 45.9 31 63.5 31C64.7 31 65.9 31.1 67.1 31.2C71.6 13.5 88 0.5 107.5 0.5C129.1 0.5 146.9 16.7 148.4 37.4C149.4 37.1 150.4 37 151.5 37C170.1 37 185.5 48.9 185.5 63.5Z"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
        </g>
      )}

      {cloudType === 1 && (
        <g filter={`url(#${filterId})`}>
          <path
            d="M180 70C180 88.7 164.7 104 146 104H54C35.3 104 20 88.7 20 70C20 51.3 35.3 36 54 36C55.3 36 56.6 36.1 57.9 36.3C62.9 17.2 80.5 3 102 3C125.8 3 145.2 20.2 146.9 42.3C147.9 42 149 41.8 150 41.8C166.6 41.8 180 54.5 180 70Z"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
          <ellipse
            cx="60"
            cy="80"
            rx="30"
            ry="20"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
          <ellipse
            cx="140"
            cy="85"
            rx="25"
            ry="15"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
        </g>
      )}

      {cloudType === 2 && (
        <g filter={`url(#${filterId})`}>
          <path
            d="M190 65C190 86.5 172.5 104 151 104H49C27.5 104 10 86.5 10 65C10 43.5 27.5 26 49 26C50.4 26 51.8 26.1 53.2 26.3C58.7 10.2 74.2 -1 92.5 -1C113.3 -1 130.4 13.7 131.9 32.8C132.8 32.6 133.7 32.5 134.6 32.5C165.1 32.5 190 46.8 190 65Z"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="70"
            r="25"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
          <circle
            cx="150"
            cy="75"
            r="20"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
          <circle
            cx="100"
            cy="90"
            r="15"
            fill="white"
            fillOpacity={opacity}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.5"
          />
        </g>
      )}
    </svg>
  );
}
