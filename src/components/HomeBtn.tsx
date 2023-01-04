import { AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const BtnWrapper = styled.div`
  height: 3vh;
  max-width: 480px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
`;
const IconBtn = styled.button`
  font-size: 20px;
  background: ${(props) => props.theme.bgColor};
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  transition: color 0.2s ease-in;
  margin-top: 10px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const IconImg = styled.span`
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) =>
      props.theme.textColor === "#000" ? "#9c88ff" : "#04B45F"};
  }
`;

interface IHomeBtn {
  isDarkMode: boolean;
  toggleDarkMode: React.MouseEventHandler<HTMLButtonElement>;
}

function HomeBtn({ isDarkMode, toggleDarkMode }: IHomeBtn) {
  return (
    <BtnWrapper>
      <Link to="/">
        <IconBtn>
          <AiOutlineHome />
        </IconBtn>
      </Link>
      <IconBtn type="button" onClick={toggleDarkMode}>
        <IconImg>{isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}</IconImg>
      </IconBtn>
    </BtnWrapper>
  );
}
export default HomeBtn;
