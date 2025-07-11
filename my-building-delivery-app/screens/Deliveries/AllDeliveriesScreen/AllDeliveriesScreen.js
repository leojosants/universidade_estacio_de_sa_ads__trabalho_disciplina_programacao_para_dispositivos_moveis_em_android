
import { DeliveryCard } from "../../../components/delivery/DeliveryCard/DeliveryCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { DeliveryModel } from "../../../models/DeliveryModel";
import { Alert, ScrollView, Text, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./all-deliveries-screen-styles";
import { colors } from "../../../styles/color-globals";
import { ROLES } from "../../../constants/roles";


export default function AllDeliveriesScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    const funcFetchDeliveries = useCallback(
        async () => {
            setLoading(true);

            try {
                const _data = await DeliveryModel.funcGetAllDeliveries();
                setDeliveries(_data);
            }
            catch (error) {
                Alert.alert(
                    "Erro", "Não foi possível carregar as encomendas."
                );

                console.error(error);
            }
            finally {
                setLoading(false);
            }

        }, []
    );

    useEffect(
        () => {
            funcFetchDeliveries();

            const unsubscribe = (
                navigation.addListener(
                    "focus", () => {
                        funcFetchDeliveries();
                    }
                )
            );

            return unsubscribe;

        }, [navigation, funcFetchDeliveries]
    );

    const funcHandleMarkAsReceived = async (id) => {
        const funcMarkAsReceived = async () => {
            try {
                await DeliveryModel.funcUpdateDeliveryStatus(id, "Retirada");
                Alert.alert("Sucesso!", "Encomenda marcada como retirada.");
                funcFetchDeliveries();
            }
            catch (error) {
                Alert.alert("Erro", "Não foi possível marcar a encomenda como retirada.");
                console.error(error);
            }
        }

        Alert.alert(
            "Confirmar Retirada",
            "Tem certeja que deseja marcar esta encomenda como retirada?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: funcMarkAsReceived
                }
            ],
            {
                cancelable: false,
            },
        );
    };

    const funcHandleDeleteDelivery = async (id) => {
        const funcDeleteDelivery = async () => {
            try {
                await DeliveryModel.funcDeleteDelivery(id);
                Alert.alert("Sucesso!", "Encomenda excluída com sucesso.");
                funcFetchDeliveries();
            }
            catch (error) {
                Alert.alert("Erro", "Não foi possível excluir a encomenda.");
                console.error(error);
            }
        };

        Alert.alert(
            "Confirmar Exclusao",
            "Tem certeza que deseja excluir esta encomenda? Esta ação é irreversível.",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    onPress: funcDeleteDelivery,
                },
            ],
            {
                cancelable: false,
            },
        );
    }

    return (
        <View style={styles.c_container}>
            <Appbar.Header style={styles.c_container__app_bar}>
                {
                    (user?.role !== ROLES.RESIDENT) && (
                        <Appbar.Action
                            onPress={() => navigation.goBack()}
                        />
                    )
                }

                <Appbar.Content
                    title={"Todas as encomendas"}
                />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.c_container__scroll_content}>
                <Text style={styles.c_scroll_content__screen_title}>
                    Histório e Pendentes
                </Text>

                {
                    loading
                        ? (
                            <ActivityIndicator
                                style={styles.c_scroll_content__loading_indicator}
                                color={colors._6200EE}
                                size={"large"}
                            />
                        )
                        : (deliveries.length === 0)
                            ? (
                                <Text style={styles.c_scroll_content__no_data_text}>
                                    Nenhuma encomenda registrada
                                </Text>
                            )
                            : (
                                deliveries.map(
                                    (delivery) => (
                                        <DeliveryCard
                                            funcOnMarkAsReceived={funcHandleMarkAsReceived}
                                            funcOnDelete={funcHandleDeleteDelivery}
                                            delivery={delivery}
                                            key={delivery.id}
                                        />
                                    )
                                )
                            )
                }
            </ScrollView>
        </View>
    );
};