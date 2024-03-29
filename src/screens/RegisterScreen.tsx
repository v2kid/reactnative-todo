import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Alert,
    ToastAndroid
  } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Firebaseaccount } from "../firebase/firestore";

export default function Register({ navigation }: any){
  function showToast() {
    ToastAndroid.show('Email already exists. Please use a different email.', ToastAndroid.SHORT);
  }
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const Signup = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await Firebaseaccount(userCredential.user.uid, email, name);
        navigation.navigate("TabsStack");
      } catch (e : any) {
        if (e.code === 'auth/email-already-in-use') {
          showToast()
        } else {
          console.log(e);
        }
      }
    };
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}></View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="mail"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
      
          <TextInput
            placeholder={"E-mail"}
            style={{ flex: 1, paddingVertical: 0 }}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="person"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
      
          <TextInput
            placeholder={"Name"}
            style={{ flex: 1, paddingVertical: 0 }}
            onChangeText={setName}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder={"Password"}
            style={{ flex: 1, paddingVertical: 0 }}
             onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={Signup}
          style={{
            backgroundColor: "#AD40AF",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, login with ...
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>back to login</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
        </View>
      </View>
    </SafeAreaView>
    )
}