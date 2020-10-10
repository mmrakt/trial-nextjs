import React from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import { SiteHeaderItem } from './item'
import { Button } from '../button'
import { UserIcon } from '../user-icon'
import { Logo } from '../logo'
export { SiteHeaderItem }

type Props = {
  left?: JSX.Element
  right?: JSX.Element
}
export const SiteHeader = (props: Props): React.ReactElement => {
  const { left, right } = props

  const router = useRouter()
  const handleClickLogo = React.useCallback(() => {
    router.push('/')
  }, [router])

  const leftElement = left ? (
    left
  ) : (
    <a onClick={handleClickLogo}>
      <Logo />
    </a>
  )
  const rightElement = right ? (
    right
  ) : (
    <>
      <SiteHeaderItem>
        <Button type="submit">
          <span>記事作成</span>
        </Button>
      </SiteHeaderItem>
      <SiteHeaderItem>
        <UserIcon src="/profile.png" />
      </SiteHeaderItem>
    </>
  )
  return (
    <header className={styles.header}>
      <div className={styles.left}>{leftElement}</div>
      <div className={styles.right}>{rightElement}</div>
    </header>
  )
}
