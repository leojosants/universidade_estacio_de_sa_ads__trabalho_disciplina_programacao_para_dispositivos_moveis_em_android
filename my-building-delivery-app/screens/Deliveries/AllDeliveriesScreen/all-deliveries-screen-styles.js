
import { StyleSheet } from "react-native";
import { colors } from "../../../styles/color-globals";


export const styles = StyleSheet.create(
    {
        c_container: {
            flex: 1,
            backgroundColor: colors._F5F5F5,
        },

        c_container__app_bar: {
            backgroundColor: colors._6200EE,
        },

        c_container__scroll_content: {
            padding: 20,
            paddingBottom: 80,
        },

        c_scroll_content__screen_title: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors._333333,
            marginBottom: 20,
            textAlign: "center",
        },

        c_scroll_content__loading_indicator: {
            marginTop: 50,
        },

        c_scroll_content__no_data_text: {
            textAlign: "center",
            marginTop: 30,
            fontSize: 20,
            color: colors._666666,
        },
    }
);