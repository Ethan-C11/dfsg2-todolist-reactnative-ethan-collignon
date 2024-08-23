import {ThemedText} from "@/components/ThemedText";
import {Alert, StyleSheet, TextInput, useColorScheme, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styles from "@/components/styles/styles";
import {ThemedView} from "@/components/ThemedView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from "ansi-fragments";
import Bouton from "@/components/Bouton";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/core";
import {useLocalSearchParams, useRouter} from "expo-router";


export default function newItem() {

    const insets = useSafeAreaInsets()
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [taskText, setTaskText] = useState("");
    const router = useRouter();
    const {idToEdit} = useLocalSearchParams() ?? undefined;
    const [title, setTitle] = useState("Ajouter une nouvelle tâche");
    let [addButtonText, setAddButtonText] = useState("Ajouter une tâche");


    const getTasksList = async () => {
        const storage = await AsyncStorage.getItem('tasksList')
        let tasksList = [];
        if (storage)
        {
            tasksList = JSON.parse(storage);
            return tasksList;
        }
    }


    useFocusEffect(
        useCallback(() => {
            if (idToEdit) {
                setTitle("Modifier une tâche")
                setAddButtonText("Modifier la tâche")

                getTasksList().then(tasksList => {
                    const indexToEdit = tasksList.findIndex(function (task: any) {
                        return task.id == idToEdit
                    });

                    setTaskText(tasksList[indexToEdit].task);
                }
            );
            } else {
                setTitle("Ajouter une nouvelle tâche")
                setAddButtonText("Ajouter une tâche")
                setTaskText("")
            }
        }, [idToEdit])
    );


    const handleEdit = async () => {
        console.log(idToEdit)
        if (!idToEdit)
            return;
;
        const tasksList = await getTasksList()

        const indexToEdit = tasksList.findIndex(function (task: any) {
            return task.id == idToEdit
        });

        tasksList[indexToEdit].task = taskText

        await AsyncStorage.setItem(
            'tasksList',
            JSON.stringify(tasksList)
        )
        Alert.alert("Tâche modifiée", "Votre tâche a été modifiée avec succès")
        setTaskText("");
    }
    const handleButtonClick = async () => {
        if (taskText == "" || taskText == undefined) {
            Alert.alert("Echec de l'opération", "Veuillez remplir le champs textuel avant d'essayer d'ajouter une tâche.");
            return;
        }

        if (idToEdit) {
            await handleEdit();
            return;
        }

        const storage = await AsyncStorage.getItem('tasksList')
        let tasksList = [];
        if (storage)
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
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedView style={isDarkMode ? styles.card : styles.lightCard}>
                <TextInput
                    style={isDarkMode ? styles.whiteText : styles.blackText}
                    onChangeText={setTaskText}
                    value={taskText}
                />
            </ThemedView>
            <Bouton text={addButtonText} type="add" icon="add-outline" onClick={handleButtonClick}/>
            <ThemedText style={styles.footerText}> {idToEdit ? "id de la tâche :" : ""} {idToEdit} </ThemedText>

        </View>
    )
}
