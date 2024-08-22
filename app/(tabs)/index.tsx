import {ThemedText} from "@/components/ThemedText";
import {FlatList, StyleSheet, useColorScheme, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styles from "@/components/styles/styles";
import Task from "@/components/Task";
import {useCallback, useEffect, useState} from "react";
import Bouton from "@/components/Bouton";
import {useFocusEffect} from "@react-navigation/core";

export default function todolist() {

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [tasksList, setTasksList] = useState<{ id: string, task:string, createdAt: Date }[]>([])

    useFocusEffect(
        useCallback(()=>{
            getTasksList();
        }, [])
    );
    const getTasksList = async () => {
        const tasksListTemp = await AsyncStorage.getItem('tasksList');
        setTasksList(tasksListTemp ? JSON.parse(tasksListTemp) : []);
    }
    const setTaskListInStorage = async () => {
        AsyncStorage.setItem(
            'tasksList',
            JSON.stringify(tasksList)
        )
    }

    const handleDeleteAll = async () => {
        setTasksList([]);
        await AsyncStorage.removeItem('tasksList');
    }

    const handleDelete = (indexToDelete: number) => {
        setTasksList(tasksList.toSpliced(indexToDelete, 1));
    }

    const placeholder = () => {
        if(tasksList.length == 0)
            return <ThemedText style={styles.todolistplaceholder}>Vous n'avez encore aucune tâche</ThemedText>
    }

    useEffect(() => {
        setTaskListInStorage()
    }, [tasksList]);

    return (
        <View style={[isDarkMode ? styles.container : styles.lightContainer, {
            marginTop: insets.top,
            marginBottom: insets.bottom,
            marginLeft: insets.left,
            marginRight: insets.right
        }]}>
            <ThemedText style={styles.title}>Todo List</ThemedText>
            {placeholder()}
            <FlatList
                data={tasksList}
                renderItem={
                    ({item}) => <Task task={item.task} createdAt={item.createdAt} id={item.id} tasksList={tasksList} handleDelete={handleDelete} />
                }
            />
            <Bouton text="Tout supprimer" icon="trash-outline" type="danger" onClick={handleDeleteAll}></Bouton>
        </View>
    )
}

