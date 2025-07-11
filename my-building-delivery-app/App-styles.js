
import { colors } from "./styles/color-globals";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create(
    {
        c_loading_container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors._F5F5F5
        },

        c_loading_container__text: {
            marginTop: 10,
            fontSize: 18,
            color: colors._666666,
        },

        c_logout_button_safe_area: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: colors._F5F5F5,
            paddingBottom: 20,
        },

        c_logout_button_safe_area__button_container: {
            alignItems: "center",
            paddingHorizontal: 20,
        },
    }
);