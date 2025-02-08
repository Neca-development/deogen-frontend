import { Modal, ModalProps, Progress } from '@mantine/core'
import { TEAM_MEMBERS } from '@shared/lib/constants/team-members.constant'
import { TextAppear } from '@shared/ui/animation/text-appear.animation'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export interface TeamMember {
  id: number
  name: string
  image: string
  brief: string
  [key: string]: string | number | undefined
  leadership: number
  communication: number
  problemSolving: number
  creativity: number
}

type TeamMemberModalProps = ModalProps & {
  role: keyof typeof TEAM_MEMBERS
  onHire: (member: TeamMember) => void
}

export function TeamMemberModalComponent({
  role,
  onHire,
  ...props
}: TeamMemberModalProps) {
  const members = Object.values(TEAM_MEMBERS[role]) as TeamMember[]
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMember = members[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : members.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < members.length - 1 ? prev + 1 : 0))
  }

  const getSkills = () => {
    const skills = Object.entries(currentMember).filter(
      (entry): entry is [string, number] =>
        typeof entry[1] === 'number' && !['id'].includes(entry[0]),
    )
    return skills
  }

  return (
    <Modal {...props} className="">
      <div className="flex">
        <div className="flex-2 flex flex-col items-center rounded-[2em] bg-[#E5E5E5] px-[2rem] pt-[1rem]">
          <h2 className="mb-[1rem] text-[2rem] font-semibold">
            Choose your {role.toLowerCase().replace('_', ' ').replace('blockchain', '')}
          </h2>

          <div className="h-auto w-[24.4375rem] rounded-[1.5rem] border-2 border-red-500 p-2">
            <div className="mb-[0.75rem] flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMember.image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  src={currentMember.image}
                  alt={`${currentMember.name} avatar`}
                  className="h-8 w-8 rounded-full"
                />
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMember.name}
                  initial={{
                    opacity: 0,
                    y: -20,
                    rotateX: 90,
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.1,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="font-inter inline-block text-[1.125rem] font-bold"
                >
                  {currentMember.name}
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMember.image}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={currentMember.image}
                alt={currentMember.name}
                className="h-[23.3125rem] w-full rounded-[1.5rem] object-cover"
              />
            </AnimatePresence>
            <div
              className="mt-[0.75rem] flex h-[3.1875rem] w-full items-center justify-center rounded-[0.75rem] font-bold"
              style={{
                background:
                  'linear-gradient(90deg, rgba(244, 100, 37, 0.2) 0%, rgba(245, 180, 11, 0.2) 100%)',
              }}
            >
              Price:{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMember.price}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mx-1 inline-block"
                >
                  {String(currentMember.price)
                    .split('')
                    .map((char, i) => (
                      <motion.span
                        key={`${currentMember.price}-${i}-${char}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                </motion.span>
              </AnimatePresence>{' '}
              USD/month
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="mt-[0.75rem] h-[3.1875rem] w-full rounded-[0.75rem] font-bold text-white"
              style={{
                background: 'linear-gradient(90deg, #F46425 0%, #F5B40B 100%)',
              }}
              onClick={() => onHire(currentMember)}
            >
              Hire
            </motion.button>
          </div>
          <div className="py-[2rem] text-center text-[2rem] font-medium">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.1 }}
                style={{ display: 'inline-block' }}
              >
                {currentIndex + 1}
              </motion.span>
            </AnimatePresence>
            /{members.length}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center px-[2rem] pt-[1rem]">
          <div className="p-0">
            <h3 className="mb-6 text-[2rem] font-semibold">Skills Rating</h3>

            <div className="space-y-6">
              {getSkills().map(
                ([skill, value]) =>
                  skill !== 'price' && (
                    <div key={skill}>
                      <div className="mb-2 flex">
                        <p className="font-sans text-[1.5rem] font-[600]">
                          {skill
                            .replace(/([A-Z])/g, ' $1')
                            .trim()
                            .split(' ')
                            .map((word, i) =>
                              i === 0
                                ? word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                                : word.toLowerCase(),
                            )
                            .join(' ')}{' '}
                        </p>
                        <p className="pl-2 font-sans text-[1.5rem] font-[600] text-[#666666]">
                          (
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={value}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                            >
                              {value / 10}
                            </motion.span>
                          </AnimatePresence>
                          /10)
                        </p>
                      </div>
                      <Progress
                        size="2.9375rem"
                        radius="1rem"
                        value={value}
                        styles={{
                          root: {
                            backgroundColor: '#F5B40B20',
                          },
                          section: {
                            background:
                              'linear-gradient(90deg, #F46425 0%, #F5B40B 100%)',
                            borderRadius: '1rem',
                          },
                        }}
                      />
                    </div>
                  ),
              )}
            </div>
            <div className="mt-6">
              <TextAppear>{currentMember.brief || ''}</TextAppear>
            </div>
          </div>

          <div className="absolute bottom-[2rem] right-[2rem] flex gap-[1.5rem]">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(244, 100, 37, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-orange-400"
            >
              <motion.img
                src="/assets/modal-arrow-left.svg"
                alt="Previous"
                className="h-6 w-6"
                animate={{ x: [-5, 0, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(244, 100, 37, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-orange-400"
            >
              <motion.img
                src="/assets/modal-arrow-right.svg"
                alt="Next"
                className="h-6 w-6"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
