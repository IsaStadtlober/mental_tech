export const layout = {
  breakpoints: {
    mobile: 600,
    tablet: 900,
    desktop: 1180,
  },

  content: {
    maxWidth: 1280,
    compactMaxWidth: 760,
  },

  header: {
    desktopHeight: 78,
    mobileHeight: 74,
  },

  screenPadding: {
    mobile: 16,
    tablet: 24,
    desktop: 32,
  },

  touchTarget: {
    minimum: 44,
  },

  sidebar: {
    width: 280,
  },
} as const;

export function isMobileWidth(
  width: number
) {
  return (
    width <
    layout.breakpoints.mobile
  );
}

export function isCompactWidth(
  width: number
) {
  return (
    width <
    layout.breakpoints.tablet
  );
}

export function isDesktopWidth(
  width: number
) {
  return (
    width >=
    layout.breakpoints.desktop
  );
}

export function getHorizontalPadding(
  width: number
) {
  if (
    width <
    layout.breakpoints.mobile
  ) {
    return layout.screenPadding.mobile;
  }

  if (
    width <
    layout.breakpoints.desktop
  ) {
    return layout.screenPadding.tablet;
  }

  return layout.screenPadding.desktop;
}

export function getHeaderHeight(
  width: number
) {
  return isCompactWidth(width)
    ? layout.header.mobileHeight
    : layout.header.desktopHeight;
}