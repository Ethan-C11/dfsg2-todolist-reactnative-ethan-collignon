import {ThemedText} from "@/components/ThemedText";
import styles from "@/components/styles/styles";
import {ThemedView} from "@/components/ThemedView";
import {Button, useColorScheme, View} from "react-native";
import Bouton from "@/components/Bouton";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Task({task, id, createdAt, tasksList, handleDelete}: any) {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';


    const getIndexToDelete = () => {
        const indexToDelete = tasksList.findIndex(function(task: any) {
            return task.id == id
        });
        handleDelete(indexToDelete)
    }

    const handleEdit = () => {

    }

    return(
        <ThemedView style={isDarkMode ? styles.card : styles.lightCard}>
            <ThemedText style={styles.taskText}> {task} </ThemedText>
            <ThemedText style={styles.dateText}> Créé le {new Date(createdAt).toLocaleDateString()} </ThemedText>
            <View style={styles.buttonContainer}>
                <Bouton text="Modifier" type="add" icon="create-outline" onClick={handleEdit} />
                <Bouton text="Supprimer" type="danger" icon="trash-outline" onClick={getIndexToDelete}/>
            </View>


        </ThemedView>
    );
}