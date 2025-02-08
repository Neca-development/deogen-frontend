import { motion, useInView } from 'framer-motion'
import * as React from 'react'

interface NumberAppearProps {
  children: React.ReactNode
  containerClassName?: string
}

export function NumberAppear({ children, containerClassName = '' }: NumberAppearProps) {
  const FADE_UP_ANIMATION = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
      },
    },
  }

  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={containerClassName}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_UP_ANIMATION}>{child}</motion.div>
        ) : (
          <motion.div variants={FADE_UP_ANIMATION}>{child}</motion.div>
        ),
      )}
    </motion.div>
  )
}
