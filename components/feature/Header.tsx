import Image from 'next/image'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useContext } from 'react'
import logoSvg from '../../icons/logo.svg'
import { Button } from '../ui/button'
import { PlaygroundContext } from './PlaygroundContext'

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext)

  return (
    <header className="h-12 px-5 border-b border-black flex items-center justify-between">
      <div className="text-xl flex items-center">
        <Image alt="logo" className="h-6 mr-2" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div>
        {theme === 'light' && (
          <Button
            variant="ghost"
            title="切换暗色主题"
            onClick={() => {
              if (setTheme)
                setTheme('dark')
            }}
          >
            <MoonIcon />
          </Button>
        )}
        {theme === 'dark' && (
          <Button
            variant="ghost"
            title="切换亮色主题"
            onClick={() => {
              if (setTheme) {
                setTheme('light')
              }
            }}
          >
            <SunIcon />
          </Button>
        )}
      </div>
    </header>
  )
}
