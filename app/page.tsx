import { PlaygroundProvider } from '@/components/PlaygroundProvider'
import ReactPlayground from '@/components/ReactPlayground'

export default function Home() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}
