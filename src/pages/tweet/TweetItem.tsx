import React from 'react'
import {} from '@material-ui/core'
import { Tweet } from '@prisma/client'

const TweetItem = ({ tweet }: { tweet: Tweet }): React.ReactElement => {
    return <li key={tweet.id}>{tweet.content}</li>
}

export default TweetItem
