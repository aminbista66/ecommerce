import styled from 'styled-components'

const ProfilePicture = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

function ProfileLink() {
  return (
    <Container>
      <ProfilePicture src='https://source.unsplash.com/random/900x700/?person'/>
      Profile Link
    </Container>
  )
}

export default ProfileLink