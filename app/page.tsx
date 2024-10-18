import ReactPlayground from '@/components/feature/ReactPlayground'
import dynamic from 'next/dynamic'

const PlaygroundProvider = dynamic(() => import('@/components/feature/PlaygroundProvider'), { ssr: false })

export default function Home() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}
