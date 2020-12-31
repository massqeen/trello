import styled from 'styled-components';

interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transform: ${(props) => (props.isPreview ? 'rotate(5deg)' : undefined)};
`;
