import React, { useState } from 'react'
import { Tweet } from '@prisma/client'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { User as IUser } from '@prisma/client'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const TweetItem = ({ tweet }: { tweet: Tweet }): React.ReactElement => {
    const [isModalOpen, openModal] = useState<boolean>(false)
    const { data: user, isLoading } = useQuery<IUser>('user', async () => {
        const res = await fetch(`/api/user/fetch/?id=${tweet.userId}`)
        return res.json()
    })
    if (isLoading) return <span>Loading...</span>

    const handleToggleModal = (): void => {
        openModal(!isModalOpen)
    }

    return (
        <div className="flex my-4 mx-2 py-2 px-2">
            <Image
                src={user.avatarUrl ? user.avatarUrl : '/avatar.png'}
                alt="アバター画像"
                width={50}
                height={50}
                className="rounded-full mx-2"
            />
            <div className="mx-2 w-full">
                <div className="text-base w-full">
                    <strong className="mx-1">{user.name}</strong>
                    <span className="mx-1">@{user.id}</span>
                    {dayjs(tweet.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                    <MoreHorizIcon
                        className="float-right"
                        onClick={handleToggleModal}
                    />
                    {isModalOpen && <div>hogehoge</div>}
                </div>
                <div className="text-xl">{tweet.content}</div>
            </div>
        </div>
    )
}

export default TweetItem
