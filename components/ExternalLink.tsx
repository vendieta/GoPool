import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';
import { Pressable, Text } from 'react-native';


export function ExternalLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={async () => {
        if (Platform.OS === 'web') {
          window.open(href, '_blank');
        } else {
          await openBrowserAsync(href);
        }
      }}
      {...props}
    >
      <>{children}</>
    </Pressable>
  );
}
