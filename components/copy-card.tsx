'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface CopyCardProps {
  type: '감성형' | '후킹형' | '정보형'
  icon: React.ReactNode
  headline: string
  body: string
  accentColor: string
}

export function CopyCard({ type, icon, headline, body, accentColor }: CopyCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${headline}\n${body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="복사하기"
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-lg font-semibold leading-relaxed text-foreground">
          {headline || '헤드라인이 여기에 표시됩니다'}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {body || '본문이 여기에 표시됩니다'}
        </p>
      </CardContent>
    </Card>
  )
}
