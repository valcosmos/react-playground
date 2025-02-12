import { downloadFiles } from '@/utils/utils'
import copy from 'copy-to-clipboard'
import { DownloadIcon, MoonIcon, Share, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useContext } from 'react'
import { toast } from 'sonner'
import logoSvg from '../../icons/logo.svg'
import { Button } from '../ui/button'
import { PlaygroundContext } from './PlaygroundContext'

export default function Header() {
  const { files } = useContext(PlaygroundContext)
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-12 px-5 flex items-center justify-between">
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
