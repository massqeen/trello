import React from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { CustomDragLayerContainer } from './styles';
import { Column } from './Column';
import { Card } from './Card';

const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === 'COLUMN' ? (
          <Column
            id={item.id}
            text={item.text}
            index={item.index}
            isPreview={true}
          />
        ) : (
          <Card
            id={item.id}
            columnId={item.columnId}
            text={item.text}
            index={0}
            isPreview={true}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  );
};
