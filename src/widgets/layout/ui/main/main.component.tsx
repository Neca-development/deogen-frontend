import { TEAM_CARDS } from '@shared/lib/constants'
import clsx from 'clsx'
import { useState } from 'react'
import { ChatCardComponent } from './ui'
import { TeamCardComponent } from './ui/team-card.component'
import { TeamMember } from './ui/team-member-modal.component'

type MainProps = React.ComponentPropsWithoutRef<'main'>

type HiredMember = {
  role: string
  member: TeamMember
}

export function Main(props: MainProps) {
  const { className, children, ...otherProps } = props
  const [hiredTeamMembers, setHiredTeamMembers] = useState<HiredMember[]>([])

  const handleHire = (role: string, member: TeamMember) => {
    if (!hiredTeamMembers.find((hired) => hired.role === role)) {
      setHiredTeamMembers([...hiredTeamMembers, { role, member }])
    }
  }

  const handleFire = (role: string) => {
    setHiredTeamMembers(hiredTeamMembers.filter((hired) => hired.role !== role))
  }

  const allTeamMembersHired = Object.keys(TEAM_CARDS).length === hiredTeamMembers.length

  return (
    <main
      className={clsx('flex flex-col px-[4rem] py-[2rem]', className)}
      {...otherProps}
    >
      <h1 className="font-sans text-[2rem] font-[600] leading-[2.25rem] text-[#000000]">
        Your team
      </h1>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="flex flex-col gap-8">
            <TeamCardComponent
              className="relative"
              data={TEAM_CARDS.manager}
              variant={
                hiredTeamMembers.find((hired) => hired.role === 'manager')
                  ? 'hired'
                  : 'unhired'
              }
              onHire={(member) => handleHire('manager', member)}
              onFire={() => handleFire('manager')}
            />
            <TeamCardComponent
              className="relative"
              data={TEAM_CARDS.blockchainAnalytic}
              variant={
                hiredTeamMembers.find((hired) => hired.role === 'blockchainAnalytic')
                  ? 'hired'
                  : 'unhired'
              }
              onHire={(member) => handleHire('blockchainAnalytic', member)}
              onFire={() => handleFire('blockchainAnalytic')}
            />
          </div>
          <ChatCardComponent
            variant={allTeamMembersHired ? 'active' : 'inactive'}
            className="row-span-2"
          />
        </div>

        <div className="flex gap-8">
          <TeamCardComponent
            className="relative"
            data={TEAM_CARDS.programmer}
            variant={
              hiredTeamMembers.find((hired) => hired.role === 'programmer')
                ? 'hired'
                : 'unhired'
            }
            onHire={(member) => handleHire('programmer', member)}
            onFire={() => handleFire('programmer')}
          />
          <TeamCardComponent
            className="relative"
            data={TEAM_CARDS.designer}
            variant={
              hiredTeamMembers.find((hired) => hired.role === 'designer')
                ? 'hired'
                : 'unhired'
            }
            onHire={(member) => handleHire('designer', member)}
            onFire={() => handleFire('designer')}
          />
          <TeamCardComponent
            className="relative"
            data={TEAM_CARDS.smmManager}
            variant={
              hiredTeamMembers.find((hired) => hired.role === 'smmManager')
                ? 'hired'
                : 'unhired'
            }
            onHire={(member) => handleHire('smmManager', member)}
            onFire={() => handleFire('smmManager')}
          />
        </div>
      </div>
    </main>
  )
}
