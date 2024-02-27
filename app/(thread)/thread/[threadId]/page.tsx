import React from 'react'

export default function ThreadIdPage(params: { params: { threadId: string } }) {
  return (
    <div>ThreadIdPage: { params.params.threadId }</div>
  )
}