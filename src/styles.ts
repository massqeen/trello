import styled from 'styled-components';

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  height: 100%;
  padding: 20px;
  width: fit-content;
`;

export const ColumnContainer = styled.div`
  background-color: #ebecf0;
  min-width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0 1px 0 0;
`;

interface AddItemButtonProps {
  dark?: boolean;
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: ${(props) => (props.dark ? '#fff' : '#669bcd')};
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? '#000' : '#fff')};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 300px;
  &:hover {
    background-color: #628cb3;
  }
`;

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: flex-start;
`;

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e40 0 1px 0 0;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;
