import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

export async function POST(req: Request) {
  const { productName, targetCustomer, keywords } = await req.json()

  const result = await generateObject({
    model: google('gemini-2.5-flash'),
    system: `당신은 한국의 최고 광고 카피라이터입니다. 주어진 제품, 타겟 고객, 키워드를 바탕으로 3가지 스타일의 광고 카피를 각각 3개씩 작성합니다.
추가로, 사용자가 입력한 강조 키워드 외에도 제품을 돋보이게 할 수 있는 효과적인 마케팅 추천/연관 키워드를 3~5개 제안해주세요.`,
    prompt: `제품명: ${productName}
타겟 고객: ${targetCustomer}
강조 키워드: ${keywords}

위 정보를 바탕으로 연관 추천 키워드와 함께 3가지 스타일의 광고 카피를 각각 3개씩 생성해주세요.`,
    schema: z.object({
      recommendedKeywords: z.array(z.string()).describe('강조 키워드와 연관된 추천/유사 마케팅 키워드 3~5개'),
      emotional: z.array(z.object({
        headline: z.string().describe('감성형 헤드라인'),
        body: z.string().describe('감성형 본문'),
      })).length(3).describe('감성형 카피 3개'),
      hooking: z.array(z.object({
        headline: z.string().describe('후킹형 헤드라인'),
        body: z.string().describe('후킹형 본문'),
      })).length(3).describe('후킹형 카피 3개'),
      informational: z.array(z.object({
        headline: z.string().describe('정보형 헤드라인'),
        body: z.string().describe('정보형 본문'),
      })).length(3).describe('정보형 카피 3개'),
    }),
  })

  return Response.json(result.object)
}
