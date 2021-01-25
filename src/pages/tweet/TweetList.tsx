import React from 'react'
import {} from '@material-ui/core'
import { useQuery } from 'react-query'
import { Tweet as ITweet } from '@prisma/client'
import TweetItem from './TweetItem'
//import { GetServerSideProps } from 'next'

// type IProps = {
//     tweetList: {
//         id: number
//         content: string
//     }[]
// }

//NOTE: こうやって書く
// export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
//     const tweetList = await prisma.tweet.findMany({
//         where: {},
//     })
//     return {
//         props: {
//             tweetList,
//         },
//     }
// }

const TweetList = (): React.ReactElement => {
    const { data: tweetList, isLoading } = useQuery<ITweet[]>(
        'tweetList',
        async () => {
            const res = await fetch('/api/tweet/fetchList')

            return res.json()
        }
    )

    if (isLoading) return <span>Loading...</span>

    return (
        <div>
            {tweetList && (
                <ul>
                    {tweetList.map((tweet) => (
                        <TweetItem tweet={tweet} key={tweet.id} />
                    ))}
                </ul>
            )}
        </div>
    )
}
export default TweetList
