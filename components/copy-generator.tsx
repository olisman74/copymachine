'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { CopyCard } from './copy-card'
import { Heart, Zap, Info } from 'lucide-react'

interface CopyResult {
  emotional: { headline: string; body: string }
  hooking: { headline: string; body: string }
  informational: { headline: string; body: string }
}

export function CopyGenerator() {
  const [productName, setProductName] = useState('')
  const [targetCustomer, setTargetCustomer] = useState('')
  const [keywords, setKeywords] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CopyResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName || !targetCustomer || !keywords) return

    setIsLoading(true)
    setResult(null)

    try {
      // Simulate 2 seconds loading
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setResult({
        emotional: {
          headline: `${targetCustomer}을 위한 ${productName}`,
          body: '고객의 감성을 자극하는 따뜻한 메시지입니다.',
        },
        hooking: {
          headline: `${keywords}의 비밀, ${productName}`,
          body: '호기심을 유발하여 클릭을 유도하는 강력한 한 줄입니다.',
        },
        informational: {
          headline: `${keywords} 개선된 ${productName}`,
          body: '제품의 장점과 혜택을 명확하게 전달하는 정보성 문구입니다.',
        },
      })
    } catch (error) {
      console.error('Error generating copy:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = !productName || !targetCustomer || !keywords || isLoading

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-1">
          <div className="space-y-2">
            <label htmlFor="productName" className="text-sm font-medium text-muted-foreground">
              제품명
            </label>
            <Input
              id="productName"
              placeholder="예: 프리미엄 유기농 그래놀라"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="h-12 border-border/50 bg-input/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="targetCustomer" className="text-sm font-medium text-muted-foreground">
              타겟 고객
            </label>
            <Input
              id="targetCustomer"
              placeholder="예: 건강을 챙기는 3040 직장인"
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              className="h-12 border-border/50 bg-input/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="keywords" className="text-sm font-medium text-muted-foreground">
              강조 키워드
            </label>
            <Input
              id="keywords"
              placeholder="예: 자연, 활력, 맛있는 아침"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="h-12 border-border/50 bg-input/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isDisabled}
          className="h-14 w-full bg-primary text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Spinner className="h-5 w-5" />
              카피 생성 중...
            </span>
          ) : (
            '카피 뽑기 🚀'
          )}
        </Button>
      </form>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <CopyCard
          type="감성형"
          icon={<Heart className="h-5 w-5 text-pink-400" />}
          headline={result?.emotional?.headline || ''}
          body={result?.emotional?.body || ''}
          accentColor="bg-gradient-to-r from-pink-500 to-rose-500"
        />
        <CopyCard
          type="후킹형"
          icon={<Zap className="h-5 w-5 text-amber-400" />}
          headline={result?.hooking?.headline || ''}
          body={result?.hooking?.body || ''}
          accentColor="bg-gradient-to-r from-amber-500 to-orange-500"
        />
        <CopyCard
          type="정보형"
          icon={<Info className="h-5 w-5 text-cyan-400" />}
          headline={result?.informational?.headline || ''}
          body={result?.informational?.body || ''}
          accentColor="bg-gradient-to-r from-cyan-500 to-blue-500"
        />
      </div>
    </div>
  )
}
