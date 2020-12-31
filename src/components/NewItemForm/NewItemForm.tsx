import React, { useState } from 'react';
import { useFocus } from '../../utils/hooks/useFocus';
import { NewItemFormContainer } from './NewItemFormContainer';
import { NewItemButton } from './NewItemButton';
import { NewItemInput } from './NewItemInput';

interface NewItemFormProps {
  onAdd(text: string): void;
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();
  const handleAddText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={({ target }) => setText(target.value)}
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
