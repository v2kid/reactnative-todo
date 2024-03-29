import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth } from "firebase/auth";
import { addTodo, getuserInfo } from "../firebase/firestore";
import { useEffect, useState } from "react";
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from "../firebase/firebase.config";
import { uid } from "uid";
interface Userdata {
  name: string;
  email: string;
  todos: any[];
}
interface Todo {
  uidd: string;
  todo: string;
}
export default function TodoScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userData, setUserData] = useState<Userdata | null>();
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      {
         const result = await getuserInfo(user?.uid);
         if (result.success) {
           setUserData({
             name: result.userdata?.name,
             email: result.userdata?.email,
             todos: result.userdata?.todos || []
           });
         } else {
           console.error('User not found');
         }
     } 
   };
    if (user) {
     fetchUserData();
      const todosRef = ref(db, `/${user.uid}`);
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const todosArray : Todo[] = Object.values(data);
        setTodos(todosArray);
      } else {
        setTodos([]);
      }
    });

    return () => {
      // Clean up the subscription when component unmounts or user changes
      unsubscribe();
    };
    }
  }, [user]);
  console.log(todos);

  const handleAddTask = async () => {
    const uidd = uid();
    set(ref(db, `/${user?.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });
    setTodo("");
  };
  const handleUpdate = (todo: any, uidd: any) => {
    setIsEdit(true);
    setTodo(todo);
    setTempUidd(uidd);
  };
  const handleEditConfirm = (todo: any) => {
    update(ref(db, `/${user?.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });
    setTodo("");
    setIsEdit(false);
  };
  const handleDelete = (uidd: any) => {
    remove(ref(db, `/${user?.uid}/${uidd}`));
  };
  const renderItem = ({ item, index }: any) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item.todo}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleUpdate(item.todo, item.uidd)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.uidd)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
 
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>hi {userData?.name}</Text>
      <Text style={styles.title}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />
      {isEdit ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleEditConfirm(todo)}
        >
          <Text style={styles.addButtonText}>Update task</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add task</Text>
        </TouchableOpacity>
      )}
        <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  scrollViewContainer: {
    flex: 1,
  },
  headingText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "white",
    paddingHorizontal: 36,
    paddingVertical: 28,
  },
  containerGap36: {
    gap: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
});
