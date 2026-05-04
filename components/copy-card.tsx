'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface CopyItem {
  headline: string
  body: string
}

interface CopyCardProps {
  type: '감성형' | '후킹형' | '정보형'
  icon: React.ReactNode
  copies: CopyItem[]
  accentColor: string
}

export function CopyCard({ type, icon, copies = [], accentColor }: CopyCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (copy: CopyItem, index: number) => {
    await navigator.clipboard.writeText(`${copy.headline}\n${copy.body}`)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className={`absolute left-0 top-0 h-1 w-full ${accentColor}`} />
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <CardTitle className="text-base font-semibold text-foreground">
            {type}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {copies.length > 0 ? (
          copies.map((copy, index) => (
            <div key={index} className="group/item relative rounded-md border border-transparent p-3 transition-colors hover:border-border/50 hover:bg-muted/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(copy, index)}
                className="absolute right-2 top-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover/item:opacity-100"
                aria-label="복사하기"
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
              <p className="pr-8 text-base font-semibold leading-relaxed text-foreground">
                {copy.headline}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {copy.body}
              </p>
            </div>
          ))
        ) : (
          <div className="p-3 text-sm text-muted-foreground">
            결과가 여기에 표시됩니다.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
