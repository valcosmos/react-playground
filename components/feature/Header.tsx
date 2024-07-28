import Image from 'next/image'
import logoSvg from '../../icons/logo.svg'

export default function Header() {
  return (
    <header className="h-12 px-5 border-b border-black flex items-center justify-between">
      <div className="text-xl flex items-center">
        <Image alt="logo" className="h-6 mr-2" src={logoSvg} />
        <span>React Playground</span>
      </div>
    </header>
  )
}
