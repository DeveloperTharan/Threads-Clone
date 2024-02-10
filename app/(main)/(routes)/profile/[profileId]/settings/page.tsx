import React from 'react'

export default function SettingsPage({ params } : { params: { profileId: string } }) {
  return (
    <div>SettingsPage{params.profileId}</div>
  )
}