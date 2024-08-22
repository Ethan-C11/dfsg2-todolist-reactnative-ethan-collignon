import {ThemedText} from "@/components/ThemedText";
import styles from "@/components/styles/styles";
import {ThemedView} from "@/components/ThemedView";
import {Touchable, TouchableOpacity, useColorScheme, View} from "react-native";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import React from "react";

export default function Bouton(props : any) {

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    let textStyle:any;
    switch (props.type) {
        case "add" :
            textStyle = styles.textButton_add;
            break;
        case "danger" :
            textStyle = styles.textButton_danger;
            break;
    }

    const iconComponent = () => {
        if(props.icon)
            return <TabBarIcon name={props.icon} style={textStyle} />;
    }

    return (
        <TouchableOpacity style={styles.button} onPress={props.onClick}>
            { iconComponent() }
            <ThemedText style={textStyle}>{props.text}</ThemedText>
        </TouchableOpacity>
    );
}