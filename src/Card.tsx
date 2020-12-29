import { CardContainer } from './styles';

interface CardProps {
  text: string;
}

export const Card = ({ text }: CardProps) => (
  <CardContainer>{text}</CardContainer>
);
