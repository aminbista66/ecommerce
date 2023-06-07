import styled from 'styled-components'

const ProfilePicture = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;

    @media screen and (max-width: 640px) {
      display: none;
}
`
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`
const Text = styled.span`
    @media screen and (max-width: 640px) {
    display: none;
  }

`

function ProfileLink() {
  return (
    <Container>
      <ProfilePicture src='https://source.unsplash.com/random/900x700/?person'/>
      <Text>PROFILE LINK</Text>
    </Container>
  )
}

export default ProfileLink