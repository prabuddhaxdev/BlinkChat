import { HeroLanding } from '@/components/LandingPage';
import { Suspense } from 'react'

export function Page(){
  return (
    <div>
      <Suspense>
        <HeroLanding />
      </Suspense>
    </div>
  );
}

export default Page