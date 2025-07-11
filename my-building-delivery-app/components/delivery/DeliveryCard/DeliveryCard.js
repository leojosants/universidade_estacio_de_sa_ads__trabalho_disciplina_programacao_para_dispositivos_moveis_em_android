
import { AuthContext } from "../../../context/AuthContext";
import { ButtonPaper } from "../../common/ButtonPaper.js";
import { styles } from "./delivery-card-styles.js";
import { ROLES } from "../../../constants/roles";
import { Card } from "react-native-paper";
import { Text } from "react-native";
import { useContext } from "react";


const status_delivery = {
    withdrawal: "Retirada",
    pending: "Pendente",
};

export const DeliveryCard = (props) => {
    const { delivery, funcOnMarkAsReceived, funcOnDelete } = props;
    const { user } = useContext(AuthContext);

    const is_resident = (
        user?.role === ROLES.RESIDENT
    );

    const funcFormatDate = (date) => {
        if (!date) return "N/A";

        const _date = new Date(date);

        return (
            `${_date.toLocaleDateString("pt-BR")} ${_date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
        );
    };

    return (
        <Card style={styles.c_container_delivery_card}>
            <Card.Content style={styles.c_container_delivery_card__content}>
                <Text style={styles.c_content__title}>
                    Encomenda para apartamento: {delivery.unit_number}
                </Text>

                <Text style={styles.c_content__bold_text}>
                    Destinatário: {delivery.addressee_name}
                </Text>

                <Text style={styles.c_content__bold_text}>
                    Quantidade de Unidades: {delivery.quantity_units}
                </Text>

                <Text style={styles.c_content__bold_text}>
                    Descrição: {delivery.description}
                </Text>

                <Text style={styles.c_content__bold_text}>
                    Status: {" "}

                    <Text
                        style={
                            (delivery.status === status_delivery.pending)
                                ? styles.c_content__status_pending
                                : styles.c_content__status_received
                        }
                    >
                        {delivery.status}
                    </Text>
                </Text>

                <Text style={styles.c_content__bold_text}>
                    Recebido em: {funcFormatDate(delivery.received_at)}
                </Text>

                {
                    (delivery.status === status_delivery.withdrawal) && (
                        <Text style={styles.c_content__bold_text}>
                            Retirado em: {funcFormatDate(delivery.delivered_at)}
                        </Text>
                    )
                }
            </Card.Content>

            <Card.Actions style={styles.c_container_delivery_card__actions}>
                {
                    (delivery.status === status_delivery.pending) && (
                        <ButtonPaper
                            style={
                                (is_resident)
                                    ? styles.c_actions__mark_received_button
                                    : styles.c_actions__mark_received_button_doorman
                            }

                            icon={
                                (is_resident)
                                    ? "check-circle"
                                    : "check-circle-outline"
                            }

                            onPress={
                                () => funcOnMarkAsReceived(delivery.id)
                            }

                            mode={
                                (is_resident)
                                    ? "contained"
                                    : "outlined"
                            }
                        >
                            Marcar como {status_delivery.withdrawal}
                        </ButtonPaper>
                    )
                }

                {
                    (delivery.status === status_delivery.withdrawal && funcOnDelete) && (
                        <ButtonPaper
                            onPress={() => funcOnDelete(delivery.id)}
                            style={styles.c_actions__delete_button}
                            mode={"contained"}
                            icon={"delete"}
                        >
                            Exluir
                        </ButtonPaper>
                    )
                }
            </Card.Actions>
        </Card>
    );
};