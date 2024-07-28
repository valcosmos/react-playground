import { PlaygroundProvider } from '@/components/feature/PlaygroundProvider'
import ReactPlayground from '@/components/feature/ReactPlayground'

export default function Home() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}
