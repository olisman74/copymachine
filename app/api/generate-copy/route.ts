import { streamText, Output } from 'ai'
import { z } from 'zod'

export async function POST(req: Request) {
  const { productName, targetCustomer, keywords } = await req.json()

  const result = streamText({
    model: 'openai/gpt-5-mini',
    system: `당신은 한국의 최고 광고 카피라이터입니다. 주어진 제품, 타겟 고객, 키워드를 바탕으로 3가지 스타일의 광고 카피를 작성합니다.

각 카피는 다음 스타일을 따릅니다:
1. 감성형: 감정에 호소하고, 공감을 이끌어내는 따뜻하고 서정적인 카피
2. 후킹형: 주목을 끌고, 호기심을 자극하는 강렬하고 임팩트 있는 카피
3. 정보형: 제품의 핵심 가치와 특징을 명확하게 전달하는 직관적인 카피

각 카피는 1-2문장으로 간결하게 작성하세요. 한국어로 작성하세요.`,
    prompt: `제품명: ${productName}
타겟 고객: ${targetCustomer}
강조 키워드: ${keywords}

위 정보를 바탕으로 3가지 스타일의 광고 카피를 생성해주세요.`,
    output: Output.object({
      schema: z.object({
        emotional: z.object({
          headline: z.string().describe('감성형 헤드라인'),
          body: z.string().describe('감성형 본문'),
        }),
        hooking: z.object({
          headline: z.string().describe('후킹형 헤드라인'),
          body: z.string().describe('후킹형 본문'),
        }),
        informational: z.object({
          headline: z.string().describe('정보형 헤드라인'),
          body: z.string().describe('정보형 본문'),
        }),
      }),
    }),
  })

  return result.toTextStreamResponse()
}
