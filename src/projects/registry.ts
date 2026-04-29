import type { ComponentType } from 'react'
import BuyerSurvey from './buyer-survey'
import HelloChaiz from './hello-chaiz'
import Q1CardExplorations from './q1-card-explorations'
import ThankYouSurveyV2 from './thank-you-survey-v2'

export type Project = {
  slug: string
  title: string
  description: string
  Component: ComponentType
}

export const projects: Project[] = [
  {
    slug: 'q1-card-explorations',
    title: 'Q1 card explorations',
    description:
      'Five takes on a single-column dark-surface Q1 card, each with a different "where to begin" cue (none, inline hint, pulse, meta chip, arrow).',
    Component: Q1CardExplorations,
  },
  {
    slug: 'thank-you-survey-v2',
    title: 'Thank-you survey v2',
    description:
      '5-question post-purchase survey with animated teaser → Q1..Q5 → completion flow. Desktop/mobile toggle in top-right. Uses framer-motion for slide+fade transitions.',
    Component: ThankYouSurveyV2,
  },
  {
    slug: 'buyer-survey',
    title: 'Buyer Survey — post-purchase',
    description:
      'Airbnb-style 5-question survey on the thank-you page. Starts as a collapsed card, expands into one-question-per-panel flow. Toggle known/unknown UTM at top.',
    Component: BuyerSurvey,
  },
  {
    slug: 'hello-chaiz',
    title: 'Hello Chaiz',
    description:
      'Sample prototype that verifies Chaiz DS tokens render correctly. Delete once you have real projects.',
    Component: HelloChaiz,
  },
]
