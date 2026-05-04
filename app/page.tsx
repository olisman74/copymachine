import { CopyGenerator } from '@/components/copy-generator'

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            10초 카피머신 ✍️
          </h1>
          <p className="text-lg text-muted-foreground">
            제품 정보만 입력하면, AI가 3가지 스타일의 광고 카피를 생성합니다
          </p>
        </header>

        <CopyGenerator />

        <footer className="mt-16 text-center text-sm text-muted-foreground/60">
          AI 기반 광고 카피 생성 도구 · 광고 전문가를 위한 빠른 아이디어 발굴
        </footer>
      </div>
    </main>
  )
}
