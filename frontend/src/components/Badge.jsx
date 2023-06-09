import styled from 'styled-components'

const StyledBadge = styled.span`
  background-color: ${({ scheme }) => scheme.bg};
  font-weight: bold;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 4px;
`;

export const BadgeColorScheme = {
  green: {
    bg: "#9AE6B4",
    text: "#48BB78",
  },
  red: {
    bg: "#FEB2B2",
    text: "#F56565",
  },
  purple: {
    bg: "#D6BCFA",
    text: "#9F7AEA",
  },
};

function Badge({scheme, children}) {
  return (
    <StyledBadge scheme={scheme}>
      {children}
    </StyledBadge>
  )
}

export default Badge