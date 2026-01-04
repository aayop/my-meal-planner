/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Brand colors (indigo/purple gradients)
const brandPrimary = '#6D28D9'; // indigo-700
const brandSecondary = '#8B5CF6'; // indigo-400
const accentLight = '#06b6d4'; // teal
const accentDark = '#8b5cf6';

export const Colors = {
  light: {
    text: '#0f172a',
    background: '#F8FAFC',
    tint: brandPrimary,
    tintSecondary: brandSecondary,
    accent: accentLight,
    card: '#ffffff',
    muted: '#64748b',
    icon: '#475569',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0b1220',
    tint: brandSecondary,
    tintSecondary: brandPrimary,
    accent: '#06b6d4',
    card: '#0f172a',
    muted: '#94a3b8',
    icon: '#9BA1A6',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
