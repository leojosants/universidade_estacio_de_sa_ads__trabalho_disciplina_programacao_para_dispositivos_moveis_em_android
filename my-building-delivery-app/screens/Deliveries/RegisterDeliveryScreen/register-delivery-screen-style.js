
import { colors } from "../../../styles/color-globals";
import { StyleSheet } from "react-native";


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

        c_scroll_content__form_container: {
            padding: 15,
            backgroundColor: colors._FFFFFF,
            borderRadius: 10,
            elevation: 2,
            shadowColor: colors._000000,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },

        c_form_container__input: {
            marginBottom: 10,
            backgroundColor: colors._FFFFFF,
            borderRadius: 8,
        },

        c_form_container__error_text: {
            color: colors._FF0000,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 12,
        },

        c_form_container__action_button: {
            marginTop: 20,
            paddingVertical: 8,
            backgroundColor: colors._03DAC5,
            borderRadius: 8,
        },

        c_scroll_content__view_all_deliveries_button: {
            marginTop: 15,
            paddingVertical: 8,
            borderColor: colors._6200EE,
            borderWidth: 1,
            borderRadius: 8,
        },
    }
);