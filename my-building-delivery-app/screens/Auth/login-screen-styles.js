
import { StyleSheet } from "react-native";
import { colors } from "../../styles/color-globals";


export const styles = StyleSheet.create(
    {
        c_container: {
            flex: 1,
            backgroundColor: colors._F5F5F5,
            justifyContent: "center",
            alignItems: "center",
        },

        c_container__login_title: {
            fontSize: 28,
            fontWeight: "bold",
            color: colors._6200EE,
            textAlign: "center",
            marginBottom: 40,
        },

        c_container__login_form: {
            paddingHorizontal: 20,
            width: "100%",
            maxWidth: 400,
        },

        c_login_form__input: {
            marginBottom: 10,
            backgroundColor: colors._FFFFFF,
            borderRadius: 8,
        },

        c_login_form__error_text: {
            color: colors._FF0000,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 12,
        },

        c_login_form__button: {
            marginTop: 20,
            paddingVertical: 8,
            backgroundColor: colors._6300EE3B,
            borderRadius: 8,
        },

        c_container__info_text: {
            marginTop: 20,
            textAlign: "center",
            color: colors._666666,
            fontSize: 13,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 3,
        },
    }
);