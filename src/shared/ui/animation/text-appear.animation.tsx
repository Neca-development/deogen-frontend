'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextAppearProps {
  children: string
  className?: string
  containerClassName?: string
}

export function TextAppear({
  children,
  className = '',
  containerClassName = '',
}: TextAppearProps) {
  const words = children.split(' ')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const pullupVariant = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.06,
      },
    }),
  }

  return (
    <div className={`flex flex-wrap font-sans ${containerClassName}`}>
      {words.map((word, i) => (
        <motion.div
          key={`${word}-${Math.random()}`}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? 'animate' : ''}
          custom={i}
          className={`pr-1 ${className}`}
        >
          {word === '' ? <span>&nbsp;</span> : word}
        </motion.div>
      ))}
    </div>
  )
}
