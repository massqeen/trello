import { CardContainer } from './styles';

interface CardProps {
  text: string;
  index: number;
}

export const Card = ({ text }: CardProps) => (
  <CardContainer>{text}</CardContainer>
);
