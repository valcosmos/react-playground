import { cva } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface MessageProps {
  type: 'error' | 'warn'
  content: string
}

const messageVariants = cva(
  'absolute right-2 bottom-0 left-2 z-10 flex h-80 mb-2 rounded-lg',
  {
    variants: {
      type: {
        error: 'text-red-400 border border-red-400 bg-red-300/10',
        warn: 'text-orange-400 border border-orange-400 bg-orange-300/10',
      },
    },
    defaultVariants: {
      type: 'warn',
    },
  },
)
const messageButtonVariants = cva(
  'absolute top-0.5 right-0.5 block w-4 h-4 p-0 text-xs text-center cursor-pointer border-none rounded-md text-white',
  {
    variants: {
      type: {
        error: 'bg-red-600',
        warn: 'bg-orange-600',
      },
    },
    defaultVariants: {
      type: 'warn',
    },
  },
)

export default function Message(props: MessageProps) {
  const { type, content } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])

  return visible
    ? (
        <div className={cn(messageVariants({ type }))}>
          <pre
            className="px-5 py-3 overflow-auto whitespace-break-spaces"
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </pre>
          <button className={cn(messageButtonVariants({ type }))} onClick={() => setVisible(false)}>
            ✕
          </button>
        </div>
      )
    : null
}
