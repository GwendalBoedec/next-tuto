import React from 'react'

interface Props {
    params: { id: number; photoId: number; }
}

const userPhoto = ({params: { id, photoId }}: Props) => {
  return (
    <div>userPhoto {id} {photoId}</div>
  )
}

export default userPhoto