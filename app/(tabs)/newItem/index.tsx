import {ThemedText} from "@/components/ThemedText";
import {Alert, StyleSheet, TextInput, useColorScheme, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styles from "@/components/styles/styles";
import {ThemedView} from "@/components/ThemedView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from "ansi-fragments";
import Bouton from "@/components/Bouton";
import {useState} from "react";


export default function newItem() {

    const insets = useSafeAreaInsets()
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [taskText, setTaskText] = useState("");

    const handleButtonClick = async () => {
        const storage = await AsyncStorage.getItem('tasksList')
        let tasksList = [];
        if(storage)
            tasksList = JSON.parse(storage);

        const newTask = {
            id: Date.now().toString(),
            task: taskText,
            createdAt: new Date(),
        }
        tasksList.push(newTask);

        await AsyncStorage.setItem(
            'tasksList',
            JSON.stringify(tasksList)
        )
        setTaskText("");
        Alert.alert("Tâche ajoutée", "Votre tâche a été ajoutée avec succès")
    }

    return (
        <View style={[isDarkMode ? styles.container : styles.lightContainer, {
            marginTop: insets.top,
            marginBottom: insets.bottom,
            marginLeft: insets.left,
            marginRight: insets.right
        }]}>
            <ThemedText style={styles.title}>Ajouter une nouvelle tâche</ThemedText>
            <ThemedView style={isDarkMode ? styles.card : styles.lightCard}>
                <TextInput
                    style={isDarkMode ? styles.whiteText : styles.blackText}
                    onChangeText={setTaskText}
                    value={taskText}
                />
            </ThemedView>
            <Bouton text="Ajouter une tâche" type="add" icon="add-outline" onClick={handleButtonClick}/>
        </View>
    )
}
