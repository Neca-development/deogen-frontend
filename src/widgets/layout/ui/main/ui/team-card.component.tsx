import { TEAM_MEMBERS } from '@shared/lib/constants/team-members.constant'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { TeamMember, TeamMemberModalComponent } from './team-member-modal.component'

type CardProps = {
  className?: string
  width?: string
  height?: string
  variant?: 'hired' | 'unhired'
  data: {
    title: string
    buttonText: string
    role: keyof typeof TEAM_MEMBERS
  }
}

export function TeamCardComponent({
  className,
  width = '25.875rem',
  height = '18.75rem',
  variant = 'unhired',
  data,
}: CardProps) {
  const [opened, setOpened] = useState(false)
  const [isHired, setIsHired] = useState(variant === 'hired')
  const [hiredMember, setHiredMember] = useState<TeamMember | null>(null)

  if (!isHired) {
    return (
      <div className={className} style={{ width, height, position: 'relative' }}>
        <TeamMemberModalComponent
          opened={opened}
          withCloseButton={false}
          onClose={() => setOpened(false)}
          size="64.3125rem"
          radius="2rem"
          role={data.role}
          onHire={(member) => {
            setHiredMember(member)
            setIsHired(true)
            setOpened(false)
          }}
          styles={{
            root: {
              backgroundColor: '#F5F5F5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        />

        <div className="absolute inset-0 rounded-[2rem] border-2 bg-[#F5F5F5]">
          <div className="h-full w-full rounded-[2rem] bg-[#F5F5F5]">
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <h2 className="text-center font-sans text-2xl font-semibold text-[#121212]">
                {hiredMember?.name ?? data.title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setOpened(true)}
                className="mt-6 rounded-[12px] bg-gradient-to-r from-[#F46425] to-[#F5B40B] px-8 py-3 font-sans text-base font-medium text-white"
              >
                {data.buttonText}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ width, height, position: 'relative' }}>
      <TeamMemberModalComponent
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(false)}
        size="40.4375rem"
        radius="2rem"
        role={data.role}
        onHire={(member) => {
          setHiredMember(member)
          setIsHired(true)
          setOpened(false)
        }}
        styles={{
          root: {
            backgroundColor: '#F5F5F5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />

      <div className="absolute inset-0 rounded-[2rem] border-2">
        <div
          className="h-full w-full rounded-[2rem]"
          style={{
            background: `linear-gradient(90deg, rgba(244, 100, 37, 0.03) 0%, rgba(245, 180, 11, 0.03) 100%),
          linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))`,
          }}
        >
          <div className="flex h-full w-full flex-col items-start p-8">
            <div className="flex items-center gap-4">
              <img
                src={hiredMember?.image}
                alt={hiredMember?.name}
                className="h-[6rem] w-[6rem] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h2 className="font-sans text-[32px] font-semibold text-[#F46425]">
                  {hiredMember?.name}
                </h2>
                <span className="text-base capitalize text-[#121212]">
                  {data.role.toLowerCase().replace('_', ' ')}
                </span>
              </div>
            </div>

            <p className="mt-4 text-base text-[#121212]">{hiredMember?.brief}</p>

            <div className="mt-auto flex w-full justify-center gap-[0.75rem]">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsHired(false)}
                className="h-[2.75rem] w-full rounded-[12px] border-2 border-[#F46425] font-sans text-base font-medium text-[#F46425]"
              >
                Fire
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpened(true)}
                className="h-[2.75rem] w-full rounded-[12px] bg-gradient-to-r from-[#F46425] to-[#F5B40B] font-sans text-base font-medium text-white"
              >
                Change
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
