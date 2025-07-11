
import { StyleSheet } from "react-native";
import { colors } from "../../../styles/color-globals";


export const styles = StyleSheet.create(
    {
        c_container_delivery_card: {
            marginBottom: 15,
            borderRadius: 10,
            elevation: 3,
            shadowColor: colors._000000,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 5,
        },

        c_container_delivery_card__content: {
            // somente para menter a hierarquia BEM
        },

        c_content__title: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 5,
            color: colors._333333,

        },

        c_content__bold_text: {
            fontWeight: "bold",
        },

        c_content__status_pending: {
            color: colors._FF9800,
            fontWeight: "bold",
        },

        c_content__status_received: {
            color: colors._4CAF50,
            fontWeight: "bold",
        },

        c_container_delivery_card__actions: {
            justifyContent: "flex-end",
        },

        c_actions__mark_received_button: {
            backgroundColor: colors._4CAF50,
            borderRadius: 0,
        },

        c_actions__mark_received_button_doorman: {
            borderColor: colors._6200EE,
            color: colors._6200EE,
            borderRadius: 8,
        },

        c_actions__delete_button: {
            backgroundColor: colors._F44336,
            borderRadius: 8,
            marginLeft: 10,
        }
    }
);