import clsx from 'clsx'
import { motion } from 'framer-motion'
import { LogoIcon } from './ui/logo.component'

type HeaderProps = React.ComponentPropsWithoutRef<'header'>

export function Header(props: HeaderProps) {
  const { className, ...otherProps } = props

  return (
    <header
      className={clsx(
        'border-b-[0.0625rem] border-[#E5E5E5] px-[4rem] py-[1.1563rem]',
        className,
      )}
      {...otherProps}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* <img className="h-auto w-[2rem]" src="/assets/icon.png" alt="Deogen-logo" /> */}
          <LogoIcon />
          <motion.h1
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="pl-[0.75rem] font-sans text-[1.25rem] font-[550]"
          >
            Deogen Founder
          </motion.h1>
        </div>
        <div className="flex items-center gap-[1.5rem]">
          <div className="flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full border border-[#E5E5E5] p-[0.9375rem]">
            <img src="/assets/bell-icon.svg" alt="bell" />
          </div>
          <div className="h-[1.5rem] w-[0.0625rem] bg-[#E5E5E5]" />
          <div className="flex items-center gap-[0.75rem]">
            <img
              src="/assets/avatar.png"
              alt="avatar"
              className="h-[3rem] w-[3rem] rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-sans text-[0.875rem] font-[500] leading-[1.3rem] text-[#121212]">
                Hanna Calzoni
              </span>
              <span className="font-sans text-[0.875rem] font-[400] leading-[1.138rem] text-[#888888]">
                Admin Store
              </span>
            </div>
            <img
              src="/assets/arrow-down-icon.svg"
              alt="arrow down"
              className="h-[0.391rem] w-[0.781rem]"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
