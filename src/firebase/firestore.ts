import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { app } from "./firebase.config";

const db = getFirestore(app);

export const edituserInfo = async (
  uid: any,
  address: any,
  email: any,
  name: any
) => {
  await setDoc(doc(db, "users", `${uid}`), {
    email: email,
    name: name,
  });
};

export const getuserInfo = async (uid: any) => {
  try {
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userdata = docSnap.data();
      console.log("Document data:", docSnap.data());
      const user = {
        email: userdata.email,
        name: userdata.name,
        todos : userdata.todos
      };
      return {
        userdata: user,
        success: true,
      };
    } else {
      return {
        success: false,
        message: "User not found.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
export const Firebaseaccount = async (uid: any, email: any, name: any) => {
  try{
    await setDoc(doc(db, "users", `${uid}`), {
      email: email,
      name: name,
    });
  }catch(error){
   console.log(error)
  }
 
};
export const addTodo = async (uid : any, todoTask : any) => {
  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, {
      todos: arrayUnion(todoTask),
    });
    console.log("Task added to 'todos' array successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error adding task to 'todos' array:", error);
    return { success: false, error : error };
  }
};
