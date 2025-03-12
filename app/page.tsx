'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { FloatingClouds } from './components/floating-clouds';

export default function NewProductsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [showClouds, setShowClouds] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치를 상태로 저장
      setScrollY(window.scrollY);

      // 스크롤이 300px 이상 내려가면 구름 표시
      if (window.scrollY > 300 && !showClouds) {
        setShowClouds(true);
      } else if (window.scrollY <= 300 && showClouds) {
        setShowClouds(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showClouds]);

  // 스크롤 위치를 0~100 사이의 값으로 정규화
  // 페이지 높이에 따라 스크롤 효과가 적절히 분배되도록 함
  const normalizedScrollY = Math.min(scrollY / 20, 100);

  return (
    <div className="flex min-h-screen flex-col w-full bg-[#f8f9fc] relative">
      {/* 구름 컴포넌트 - 트랜지션 효과 적용 */}
      <div
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ${
          showClouds ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {showClouds && <FloatingClouds scrollY={normalizedScrollY} />}
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md border-slate-200">
        <div className="container max-w-full mx-auto flex h-20 items-center justify-between px-2 md:px-4">
          <Link href="#" className="font-bold">
            <span className="text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              브랜드명
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="text-lg font-medium hover:text-indigo-600 transition-colors"
              >
                홈
              </Link>
              <Link
                href="#"
                className="text-lg font-medium text-indigo-600 border-b-2 border-indigo-600 pb-1"
              >
                신제품
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:text-indigo-600 transition-colors"
              >
                카테고리
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:text-indigo-600 transition-colors"
              >
                이벤트
              </Link>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          <div className="container max-w-full mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <Badge className="px-4 py-1.5 text-base bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors">
                  신제품 출시
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  혁신적인 신제품을 소개합니다
                </h1>
                <p className="max-w-[800px] text-slate-600 text-lg md:text-2xl">
                  최신 기술과 디자인이 결합된 신제품으로 일상을 더 편리하게
                  만들어보세요.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <Button
                  className="w-full text-lg text-white py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/20 transition-all duration-200"
                  size="lg"
                >
                  지금 구매하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-full mx-auto px-2 md:px-4">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
                  특별 이벤트 진행 중
                </h2>
                <p className="max-w-[800px] text-slate-600 text-lg md:text-xl">
                  신제품 출시 기념 특별 이벤트! 지금 구매하시면 20% 할인과 함께
                  사은품을 드립니다.
                </p>
              </div>
              <div className="w-full max-w-2xl space-y-4 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-indigo-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-800">
                    이벤트 기간
                  </p>
                  <p className="text-indigo-600 mt-2 text-lg font-medium">
                    오늘부터 단 3일!
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-indigo-200 pt-6">
                  <div className="text-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-indigo-700 font-bold text-lg">
                        1
                      </span>
                    </div>
                    <p className="font-medium text-lg text-indigo-800">
                      혜택 1
                    </p>
                    <p className="text-slate-600 mt-1 text-base">
                      전 제품 20% 할인
                    </p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-indigo-700 font-bold text-lg">
                        2
                      </span>
                    </div>
                    <p className="font-medium text-lg text-indigo-800">
                      혜택 2
                    </p>
                    <p className="text-slate-600 mt-1 text-base">사은품 증정</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-indigo-700 font-bold text-lg">
                        3
                      </span>
                    </div>
                    <p className="font-medium text-lg text-indigo-800">
                      혜택 3
                    </p>
                    <p className="text-slate-600 mt-1 text-base">무료 배송</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-indigo-50">
          <div className="container max-w-full mx-auto px-2 md:px-4">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
                  신제품 라인업
                </h2>
                <p className="max-w-[800px] text-slate-600 text-lg md:text-xl">
                  최신 기술과 트렌드를 반영한 신제품들을 만나보세요.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden flex flex-col w-full h-full bg-white border-0 shadow-lg shadow-indigo-100/40 hover:shadow-xl hover:shadow-indigo-200/50 transition-all duration-200 rounded-xl"
                >
                  <CardHeader className="p-0">
                    <div className="relative h-72 w-full overflow-hidden group">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-3 right-3 text-base px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">
                          NEW
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-xl text-slate-800">
                          {product.name}
                        </h3>
                        <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="ml-1 text-sm font-medium text-slate-700">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-base text-slate-600">
                        {product.description}
                      </p>
                      <div className="pt-2">
                        <p className="font-bold text-xl text-indigo-700">
                          {product.price.toLocaleString()}원
                        </p>
                        {product.originalPrice && (
                          <p className="text-base text-slate-500 line-through">
                            {product.originalPrice.toLocaleString()}원
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full text-base py-4 bg-indigo-600 hover:bg-indigo-700 group text-white">
                      <ShoppingCart className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                      장바구니에 추가
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-10 md:py-12 w-full bg-slate-900 text-white border-slate-800">
        <div className="container max-w-full mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <Link href="#" className="font-bold">
              <span className="text-2xl bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                브랜드명
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                고객센터
              </Link>
            </nav>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400">
              © 2025 브랜드명. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: '스마트 홈 허브 프로',
    description: '모든 스마트 기기를 하나로 연결하는 최신 AI 기반 홈 허브',
    price: 299000,
    originalPrice: 350000,
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2532&auto=format&fit=crop',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: '에코 무선 이어버드',
    description: '최대 30시간 재생 가능한 노이즈 캔슬링 무선 이어버드',
    price: 189000,
    originalPrice: 220000,
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2370&auto=format&fit=crop',
    rating: 4.7,
    isNew: true,
  },
  {
    id: 3,
    name: '퓨어 공기청정기 미니',
    description: '작지만 강력한 성능의 휴대용 공기청정기',
    price: 129000,
    originalPrice: 150000,
    image:
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2370&auto=format&fit=crop',
    rating: 4.5,
    isNew: true,
  },
  {
    id: 4,
    name: '스마트 수면 트래커',
    description: '수면 패턴을 분석하고 개선 방법을 제안하는 웨어러블 기기',
    price: 99000,
    originalPrice: 120000,
    image:
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2488&auto=format&fit=crop',
    rating: 4.6,
    isNew: true,
  },
  {
    id: 5,
    name: '퀵 무선 충전 스탠드',
    description: '15W 고속 충전이 가능한 멀티 디바이스 충전 스탠드',
    price: 79000,
    originalPrice: 95000,
    image:
      'https://images.unsplash.com/photo-1618478594486-c65b899c4936?q=80&w=2370&auto=format&fit=crop',
    rating: 4.4,
    isNew: true,
  },
  {
    id: 6,
    name: '스마트 체중계',
    description: '체중, 체지방, BMI 등을 측정하고 앱과 연동되는 스마트 체중계',
    price: 69000,
    originalPrice: 85000,
    image:
      'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?q=80&w=2370&auto=format&fit=crop',
    rating: 4.3,
    isNew: true,
  },
  {
    id: 7,
    name: '포터블 블루투스 스피커',
    description: '방수 기능과 24시간 재생 가능한 휴대용 블루투스 스피커',
    price: 89000,
    originalPrice: 110000,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2369&auto=format&fit=crop',
    rating: 4.5,
    isNew: true,
  },
  {
    id: 8,
    name: '스마트 조명 키트',
    description: '음성 제어 가능한 스마트홈 연동 LED 조명 세트',
    price: 149000,
    originalPrice: 180000,
    image:
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2370&auto=format&fit=crop',
    rating: 4.6,
    isNew: true,
  },
  {
    id: 9,
    name: '스마트 헬스 워치',
    description:
      '심박수, 산소포화도, 활동량 측정 및 수면 분석이 가능한 고급형 스마트워치',
    price: 249000,
    originalPrice: 299000,
    image:
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=2370&auto=format&fit=crop',
    rating: 4.9,
    isNew: true,
  },
  {
    id: 10,
    name: '다기능 로봇 청소기',
    description:
      'AI 매핑 기술로 집안 구조를 학습하고 자동 충전하는 스마트 로봇 청소기',
    price: 399000,
    originalPrice: 450000,
    image:
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?q=80&w=2676&auto=format&fit=crop',
    rating: 4.7,
    isNew: true,
  },
];
