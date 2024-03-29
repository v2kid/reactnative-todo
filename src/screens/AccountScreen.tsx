import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
export default function AccountScreen({ navigation }: any){
    const handleSignOut = async () => {
        try {
          const auth = getAuth();
          await signOut(auth);
          navigation.navigate("Login")
        } catch (error) {
          // An error happened.
          console.error('Sign-out error:', error);
          Alert.alert('Error', 'Failed to sign out');
        }
      };
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You are signed in!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
          );
}