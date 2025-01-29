# Handoff Frontend Take-Home Challenge

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) as a starting point for the frontend engineering take-home challenge.

## Project Structure

```s
├── app/                  # Main application directory (file-based routing)
├── assets/               # Static assets (images, fonts)
├── src/                  # Source code directory
│   ├── common/           # Shared components and utilities
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utility functions and helpers
│   │   └── theme/        # Design system tokens and themes
│   │       ├── tokens/   # Design tokens (colors, typography, spacing)
│   └── estimate/         # Feature-specific code
```

## Challenge Overview

This take-home challenge evaluates your ability to build and style a React Native screen using provided design tokens and layout specifications.

### Goals

1. **Screen Implementation**

    - Build a functional React Native screen following the provided Figma design
    - Implement the screen for both mobile and web platforms
    - Ensure proper handling of user interactions and data management

2. **Design System Integration**

    - Utilize provided design tokens for consistent styling
    - Implement both light and dark mode themes
    - Maintain visual consistency across platforms

3. **Code Quality**
    - Write clean, modular, and maintainable code
    - Follow React Native best practices
    - Implement proper component structure and state management

### Optional Enhancements

-   Implement swipe-to-delete functionality for mobile
-   Add collapsible sections
-   Additional animations and interactions

## Getting Started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app
    ```bash
    npx expo start
    ```

Available development options:

-   [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go)

## Resources

-   [Figma Design](https://www.figma.com/design/Blk49Bk32ACk3yuDC2Vsq5/Take-Home-Assement---Front-End-Jan-2025?node-id=4044-145&t=4yKjBuOChIiCckTl-11) (Password: `H@ndoff#`)
-   [Expo Documentation](https://docs.expo.dev/)
-   [React Native Documentation](https://reactnative.dev/)

## Learn More

-   [Expo documentation](https://docs.expo.dev/)
-   [React Native documentation](https://reactnative.dev/)
-   [Expo Router documentation](https://docs.expo.dev/router/introduction/)
