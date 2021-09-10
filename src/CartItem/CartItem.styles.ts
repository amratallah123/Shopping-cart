import styled from "styled-components";
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  height: 300px;
  margin-bottom: 50px;
  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  img {
    max-width: 90px;
    object-fit: cover;
    margin-left: 40px;
  }
`;