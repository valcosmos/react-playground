import Image from 'next/image'
import { DownloadIcon, MoonIcon, Share, SunIcon } from 'lucide-react'
import { useContext } from 'react'
import copy from 'copy-to-clipboard'
import { toast } from 'sonner'
import logoSvg from '../../icons/logo.svg'
import { Button } from '../ui/button'
import { PlaygroundContext } from './PlaygroundContext'
import { downloadFiles } from '@/utils/utils'

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext)

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

        <Button
          variant="ghost"
          onClick={() => {
            copy(window.location.href)
            toast.success('Link has been copied.')
          }}
        >
          <Share />
        </Button>
        <Button
          variant="ghost"
          onClick={async () => {
            if (files)
              await downloadFiles(files)
            toast.success('Downloaded.')
          }}
        >
          <DownloadIcon />
        </Button>
      </div>
    </header>
  )
}
