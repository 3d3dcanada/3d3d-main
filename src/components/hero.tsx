import Link from 'next/link'
import { Section } from '@/components/section'
import { Card } from '@/components/card'
import { ACCENTS, type AccentKey, type Cta } from '@/data/buildV2'

type HeroProps = {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  accent: AccentKey
  ctas?: Cta[]
}

export function Hero({ eyebrow, title, subtitle, image, accent, ctas = [] }: HeroProps) {
  return (
    <Section accent={ACCENTS[accent]} imageSrc={image} imagePosition="center" align="start" hero>
      <Card accent={ACCENTS[accent]} eyebrow={eyebrow} title={title} titleAs="h1" subtitle={subtitle} hero>
        {ctas.length > 0 ? (
          <div className="button-row">
            {ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className={cta.ghost ? 'button-link--ghost' : 'button-link'}>
                {cta.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Card>
    </Section>
  )
}
