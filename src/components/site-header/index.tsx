import React from 'react'
import { useRouter } from 'next/router'

import styles from './index.module.css'

export const SiteHeader = (): React.ReactElement => {
  const router = useRouter()
  const handleClickLogo = React.useCallback(() => {
    router.push('/')
  }, [router])
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <a onClick={handleClickLogo}>
          <div>やばいブログ</div>
        </a>
      </div>
      <div className={styles.right}>
        <img src="/profile.png" className={styles.userIcon} />
      </div>
    </header>
  )
}
