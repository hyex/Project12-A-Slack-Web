import React, { useRef, useEffect } from 'react'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { IconType } from '@atom/Icon'
import { TextType } from '@atom/Text'
import { ThreadListProps } from '.'

import Styled from './ThreadList.style'

const ThreadList = ({
  channelInfo,
  threads,
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: ThreadListProps) => {
  const { id, type, name } = channelInfo

  const threadEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (threadEndRef) {
      threadEndRef.current!.scrollIntoView()
    }
  }

  useEffect(scrollToBottom, [threads])

  const subViewHeader = (
    <Styled.ThreadSubViewHeaderWrapper>
      <A.Text customStyle={threadTextStyle}>Thread</A.Text>

      <Styled.ChannelNameWrapper>
        <A.Icon
          icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock}
          customStyle={iconStyle}
        />
        <A.Text customStyle={channelNameTextStyle}>{name}</A.Text>
      </Styled.ChannelNameWrapper>
    </Styled.ThreadSubViewHeaderWrapper>
  )

  return (
    <Styled.ChannelMainContainer>
      <Styled.ThreadListContainer>
        {threads.map((thread, index, arr) => {
          // TODO: messages(reply) api 생성 후 합치기

          // const threadDetail = (
          //   <O.ThreadDetail
          //     thread={thread}
          //     onReplyButtonClick={() => alert(`reply to ${thread.id}`)}
          //   />
          // )

          // const handleReplyButtonClick = () => {
          //   handleSubViewOpen()
          //   handleSubViewHeader(subViewHeader)
          //   handleSubViewBody(threadDetail)
          // }
          const handleReplyButtonClick = () => alert('thread detail open')

          const prevThread = index > 0 ? arr[index - 1] : undefined

          const sameUser = !!(
            prevThread && prevThread.User.id === thread.User.id
          )
          const hasReply = thread.replyCount !== 0

          const prevHasReply = prevThread && prevThread.replyCount !== 0

          const continuous = sameUser && !hasReply && !prevHasReply
          return (
            <O.MessageCard
              data={thread}
              type="THREAD"
              continuous={continuous}
              onReplyButtonClick={handleReplyButtonClick}
              key={thread.id}
            />
          )
        })}
        <div ref={threadEndRef} />
      </Styled.ThreadListContainer>
      <Styled.EditorContainer>
        <O.MessageEditor placeHolder={`Send a message to #${name}`} />
      </Styled.EditorContainer>
    </Styled.ChannelMainContainer>
  )
}

const threadTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
  margin: '2px 0',
}

const iconStyle: IconType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.2rem',
  margin: '0 3px 0 0',
}

const channelNameTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.2rem',
}

export default ThreadList
