import { Home } from '@/components/Home';
import { Suspense } from 'react'

export function Page(){
  return (
    <div>
      <Suspense>
        <Home />
      </Suspense>
    </div>
  );
}

export default Page