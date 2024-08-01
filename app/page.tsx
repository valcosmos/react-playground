import dynamic from 'next/dynamic'
import ReactPlayground from '@/components/feature/ReactPlayground'

const PlaygroundProvider = dynamic(() => import('@/components/feature/PlaygroundProvider'), { ssr: false })

export default function Home() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}
