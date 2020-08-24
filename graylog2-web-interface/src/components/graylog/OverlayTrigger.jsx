// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-restricted-imports
import { OverlayTrigger as BootstrapOverlayTrigger } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import type { StyledComponent } from 'styled-components';

type Props = {
  children: React.Node,
  overlay: React.Node,
  placement: string,
};

const StyledOverlayWrap: StyledComponent<{placement: string}, void, HTMLDivElement> = styled.div(({ placement }) => {
  let transform;
  let oppositePlacement;

  switch (placement) {
    case 'bottom':
      transform = 'translateX(-50%)';
      oppositePlacement = 'top';
      break;
    case 'right':
      transform = 'translateY(-50%)';
      oppositePlacement = 'left';
      break;
    case 'left':
      transform = 'translate(-100%, -50%)';
      oppositePlacement = 'right';
      break;
    case 'top':
    default:
      transform = 'translate(-50%, -100%)';
      oppositePlacement = 'bottom';
  }

  return css`
    transform: ${transform};
    z-index: 1070;
    position: absolute;

    &.in {
      opacity: 1;
    }

    > * {
      position: static;
    }
    
    .popover.${placement} {
      transform: none; 
      
      > .arrow {
        ${oppositePlacement}: 0;
      }
    }
  `;
});

const OverlayTrigger = ({ children, overlay, placement, ...rest }: Props) => {
  const wrappedOverlay = (
    <StyledOverlayWrap placement={placement}>
      {overlay}
    </StyledOverlayWrap>
  );

  return (
    <BootstrapOverlayTrigger {...rest} placement={placement} overlay={wrappedOverlay}>
      {children}
    </BootstrapOverlayTrigger>
  );
};

OverlayTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  overlay: PropTypes.node.isRequired,
};

/** @component */
export default OverlayTrigger;
