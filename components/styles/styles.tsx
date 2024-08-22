import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    lightContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#0e1924',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal : 25,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 3,
    },
    lightCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal : 25,        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 3,
        gap : 10,
    },
    taskText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 15,
    },
    todolistplaceholder: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    textButton_add: {
        color: '#0088ff',
    },
    textButton_danger: {
        color: '#f00',
    },
    button: {
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
    },
    dateText:{
        color: '#b6b7b8',
        fontSize: 14
    },
    whiteText:{
        color: '#fff'
    },
    blackText:{
        color: '#000'
    }
});

export default styles;
