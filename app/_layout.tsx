import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";
import { AuthProvider } from "@/src/providers/auth";
import { theme } from "@/src/constant/theme";

function RootLayoutNav() {
  const { session, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session && user) {
      if (user.role === 'mitra') {
        router.replace('/(app)/(mitra)');
      } else if (user.role === 'pengguna') {
        router.replace('/(app)/(customer)');
      }
    }
    setIsLoading(false);
  }, [session, user]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.white },
        animation: 'fade'
      }}
    >
      {!session ? (
        <>
          <Stack.Screen name="(start)" />
          <Stack.Screen name="(auth)" />
        </>
      ) : (
        <Stack.Screen 
          name="(app)" 
          redirect={!session}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
