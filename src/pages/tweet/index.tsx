import React, { useState, useRef } from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import ProtectedRoute from '@/auth/ProtectedRoute'
import Button from '../../components/Button'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Tweet as ITweet } from '@prisma/client'
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

const Tweet = (): React.ReactElement => {
    const [content, setContent] = useState<string>('')
    const queryClient = useQueryClient()
    const { data: tweetList, isLoading } = useQuery<ITweet[]>(
        'tweetList',
        async () => {
            const res = await fetch('/api/fetchTweetList')

            return res.json()
        }
    )

    //if (isLoading) return <span>Loading...</span>

    const { mutate } = useMutation(
        () => {
            return fetch('/api/createTweet', {
                method: 'POST',
                body: content,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('tweetList')
            },
        }
    )

    const onTweet = async (event) => {
        event.preventDefault()
        mutate()
    }

    return (
        <ProtectedRoute>
            <Layout title="タイムライン">
                <div>
                    <textarea
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="今なにしてる？"
                        onChange={(event) => setContent(event.target.value)}
                    ></textarea>
                    <Button
                        text="つぶやく"
                        onClickEvent={(event) => onTweet(event)}
                    />
                </div>
                <div>
                    {tweetList && (
                        <ul>
                            {tweetList.map((tweet, index) => (
                                <li key={index}>{tweet.content}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </Layout>
        </ProtectedRoute>
    )
}
export default Tweet
