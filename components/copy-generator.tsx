'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { CopyCard } from './copy-card'
import { Heart, Zap, Info } from 'lucide-react'

interface CopyItem {
  headline: string
  body: string
}

interface CopyResult {
  recommendedKeywords?: string[]
  emotional?: CopyItem[]
  hooking?: CopyItem[]
  informational?: CopyItem[]
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
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, targetCustomer, keywords }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      setResult(data)
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

      {result?.recommendedKeywords && result.recommendedKeywords.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-primary/10 bg-primary/5 p-4">
          <span className="text-sm font-semibold text-primary">추천 키워드:</span>
          {result.recommendedKeywords.map((kw, i) => (
            <span key={i} className="rounded-full border bg-background px-3 py-1 text-sm text-foreground shadow-sm">
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <CopyCard
          type="감성형"
          icon={<Heart className="h-5 w-5 text-pink-400" />}
          copies={result?.emotional || []}
          accentColor="bg-gradient-to-r from-pink-500 to-rose-500"
        />
        <CopyCard
          type="후킹형"
          icon={<Zap className="h-5 w-5 text-amber-400" />}
          copies={result?.hooking || []}
          accentColor="bg-gradient-to-r from-amber-500 to-orange-500"
        />
        <CopyCard
          type="정보형"
          icon={<Info className="h-5 w-5 text-cyan-400" />}
          copies={result?.informational || []}
          accentColor="bg-gradient-to-r from-cyan-500 to-blue-500"
        />
      </div>
    </div>
  )
}
