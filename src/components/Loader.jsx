import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(ellipse at center, #ffeeda 0%, #fffbfd 100%);
`;

const Hanger = styled.div`
  width: 80px;
  height: 100px;
  position: relative;
  margin-bottom: 20px;
  animation: ${spin} 1s linear infinite;

  &:before, &:after {
    content: '';
    position: absolute;
    background: #203b6c;
    border-radius: 4px;
  }
  &:before {
    left: 36px;
    top: 0;
    width: 8px;
    height: 35px;
  }
  &:after {
    left: 6px;
    top: 35px;
    width: 68px;
    height: 8px;
    border-radius: 8px 8px 40px 40px;
  }
`;

const AIStylish = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #203b6c;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const LoaderHanger = () => (
  <LoaderWrapper>
    <Hanger />
    <AIStylish>
      Styling with AI Magic...
    </AIStylish>
  </LoaderWrapper>
);

export default LoaderHanger;
