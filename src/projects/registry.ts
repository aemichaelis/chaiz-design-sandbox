import type { ComponentType } from 'react'
import HelloChaiz from './hello-chaiz'

export type Project = {
  slug: string
  title: string
  description: string
  Component: ComponentType
}

export const projects: Project[] = [
  {
    slug: 'hello-chaiz',
    title: 'Hello Chaiz',
    description:
      'Sample prototype that verifies Chaiz DS tokens render correctly. Delete once you have real projects.',
    Component: HelloChaiz,
  },
]
