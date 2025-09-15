import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'BeYou',
        headerTintColor: '#000000', // back button color
        headerTitleStyle: {
          color: '#000000', // Red title text color
        },
        headerStyle: {
          backgroundColor: '#D7A1F9', // Black header background
        },
      }}
    />
  );
}
