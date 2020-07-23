import chroma from 'chroma-js';
// eslint-disable-next-line no-restricted-imports
import { Button as BootstrapButton } from 'react-bootstrap';
import styled, { css } from 'styled-components';

const buttonGenerator = (colors) => {
  const variants = {
    danger: colors.variant.danger,
    default: colors.gray[90],
    info: colors.variant.info,
    link: 'rgba(255, 255, 255, 0)',
    primary: colors.variant.primary,
    success: colors.variant.success,
    warning: colors.variant.warning,
  };

  const mixColor = (originalColor) => chroma.mix(originalColor, colors.global.textDefault, 0.15);

  const buttonStyles = Object.keys(variants).map((variant) => css(({ theme }) => {
    const variantColor = variants[variant];
    const isLink = variant === 'link';

    const buttonAdjustColor = chroma(variantColor).luminance() > 0.5 ? colors.global.textDefault : colors.global.textAlt;

    const defaultBackground = variantColor;
    const defaultBorder = isLink ? variants.link : chroma.mix(variantColor, buttonAdjustColor, 0.05);
    const defaultColor = isLink ? colors.global.link : theme.utils.contrastingColor(defaultBackground);

    const activeBackground = isLink ? variants.link : chroma.mix(variantColor, buttonAdjustColor, 0.10);
    const activeBorder = isLink ? variants.link : chroma.mix(variantColor, buttonAdjustColor, 0.15);
    const activeColor = isLink ? colors.global.linkHover : theme.utils.contrastingColor(activeBackground);

    const disabledBackground = isLink ? variants.link : chroma.mix(variantColor, buttonAdjustColor, 0.20);
    const disabledBorder = isLink ? variants.link : chroma.mix(variantColor, buttonAdjustColor, 0.15);
    const disabledColor = isLink ? colors.global.link : theme.utils.contrastingColor(disabledBackground, 'AA');

    return css`
      &.btn-${variant} {
        background-color: ${defaultBackground};
        border-color: ${defaultBorder};
        color: ${defaultColor};
        transition: background-color 150ms ease-in-out,
          border 150ms ease-in-out,
          color 150ms ease-in-out;

        :hover {
          background-color: ${mixColor(defaultBackground)};
          border-color: ${mixColor(defaultBorder)};
          color: ${mixColor(defaultColor)};
        }

        &.active {
          background-color: ${activeBackground};
          border-color: ${activeBorder};
          color: ${activeColor};

          :hover {
            background-color: ${isLink ? variants.link : mixColor(activeBackground)};
            border-color: ${mixColor(activeBorder)};
            color: ${mixColor(activeColor)};
          }
        }

        &[disabled],
        &.disabled {
          background-color: ${isLink ? variants.link : disabledBackground};
          border-color: ${disabledBorder};
          color: ${disabledColor};

          :hover {
            background-color: ${disabledBackground};
            border-color: ${disabledBorder};
            color: ${disabledColor};
          }
        }
      }
    `;
  }));

  return styled(BootstrapButton)`
    ${buttonStyles}
  `;
};

export default buttonGenerator;
