import React, { useState } from 'react'
import {} from '@material-ui/core'
import Button from '../../components/Button'
import { useMutation, useQueryClient } from 'react-query'

const TweetForm = (): React.ReactElement => {
    const [content, setContent] = useState<string>('')
    const queryClient = useQueryClient()

    const { mutate } = useMutation(
        () => {
            return fetch('/api/tweet/create', {
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

    const onTweet = (event) => {
        event.preventDefault()
        mutate()
    }

    return (
        <div>
            <textarea
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="今なにしてる？"
                onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <Button text="つぶやく" onClickEvent={(event) => onTweet(event)} />
        </div>
    )
}
export default TweetForm
