
import AsyncStorage from "@react-native-async-storage/async-storage";


const ASYNC_STORAGE_KEY = "@EstacioADS:my_building_delivery_app";
let array_deliveries_data = [];

export const DeliveryModel = (
    () => {
        const status_delivery = {
            withdrawal: "Retirada",
            pending: "Pendente",
        };

        const funcLoadInitialData = async () => {
            try {
                // await AsyncStorage.clear(); // para limpar oAsyncStorage caso necessário (CUIDADO)

                const stored_data = (
                    await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
                );

                if (stored_data !== null) {
                    const parsed_data = (
                        JSON
                            .parse(stored_data)
                            .map(
                                (delivery) => (
                                    {
                                        ...delivery,

                                        received_at: new Date(delivery.received_at),

                                        delivered_at: delivery.delivered_at
                                            ? new Date(delivery.delivered_at)
                                            : null,

                                        quantity_units: delivery.quantity_units || 1,
                                    }
                                )
                            )
                    );

                    array_deliveries_data = parsed_data;

                    console.log(
                        "Dados carregados do AsyncStorage:", array_deliveries_data.length, "itens"
                    );
                }
                else {
                    const initial_sample_data = [
                        {
                            id: "1",
                            unit_number: "101",
                            addressee_name: "João Silva",
                            description: "Caixa pequena",
                            status: "Pendente",
                            received_at: new Date("2025-07-01T10:00:00"),
                            delivered_at: null,
                            quantity_units: 1
                        },
                        {
                            id: "2",
                            unit_number: "202",
                            addressee_name: "Maria Souza",
                            description: "Envelope",
                            status: "Pendente",
                            received_at: new Date("2025-07-02T11:30:00"),
                            delivered_at: null,
                            quantity_units: 1,
                        },
                        {
                            id: "3",
                            unit_number: "101",
                            addressee_name: "João Silva",
                            description: "Pacote grande",
                            status: "Retirada",
                            received_at: new Date("2025-06-25T09:00:00"),
                            delivered_at: new Date("2025-06-25T14:00:00"),
                            quantity_units: 2
                        },
                        {
                            id: "4",
                            unit_number: "301",
                            addressee_name: "Carlos Pereira",
                            description: "Livro",
                            status: "Pendente",
                            received_at: new Date("2025-07-03T15:00:00"),
                            delivered_at: null,
                            quantity_units: 1,
                        },
                    ];

                    // await funcSaveDeliveries(initial_sample_data);

                    console.log(
                        "Dados iniciais de exemplo salvos no AsyncStorage."
                    );
                }
            }
            catch (error) {
                console.log(
                    "Erro ao carregar dados do AsyncStorage:", error
                );
            }
        };

        const funcSaveDeliveries = async (_data) => {
            try {
                await AsyncStorage.setItem(
                    ASYNC_STORAGE_KEY, JSON.stringify(_data)
                );

                array_deliveries_data = _data;
            }
            catch (error) {
                console.error(
                    "Erro ao salvar dados no AsyncStorage: ", error
                );
            }
        };

        const funcGetAllDeliveries = async () => {
            return new Promise(
                (resolve) => {
                    setTimeout(
                        () => {
                            const sorted_data = (
                                [...array_deliveries_data]
                                    .sort(
                                        (a, b) => b.received_at.getTime() - a.received_at.getTime()
                                    )
                            );

                            resolve(sorted_data);

                        }, 500
                    );
                }
            );
        };

        const funcUpdateDeliveryStatus = async (delivery_id, new_status) => {
            return new Promise(
                async (resolve, reject) => {
                    setTimeout(
                        async () => {
                            const index = (
                                array_deliveries_data.findIndex(
                                    (delivery) => delivery.id === delivery_id
                                )
                            );

                            if (index !== -1) {
                                const updated_data = [...array_deliveries_data];
                                updated_data[index].status = new_status;

                                updated_data[index].delivered_at = (
                                    (new_status === status_delivery.withdrawal)
                                        ? new Date()
                                        : null
                                );

                                await funcSaveDeliveries(updated_data);

                                resolve(updated_data[index]);
                            }
                            else {
                                reject(
                                    new Error("Encomenda não encontrada.")
                                );
                            }
                        }, 300
                    );
                }
            );
        };

        const funcDeleteDelivery = async (delivery_id) => {
            return new Promise(
                async (resolve, reject) => {
                    setTimeout(
                        async () => {
                            const initial_length = array_deliveries_data.length;

                            const updated_data = (
                                array_deliveries_data.filter(
                                    (delivery) => delivery.id !== delivery_id
                                )
                            );

                            if (updated_data.length < initial_length) {
                                await funcSaveDeliveries(updated_data);

                                resolve(
                                    {
                                        success: true,
                                        message: "Encomenda excluída com sucesso."
                                    }
                                );
                            }
                            else {
                                reject(
                                    new Error("Encomenda não encontrada para exclusão.")
                                );
                            }
                        }, 300
                    );
                }
            );
        };

        const funcRegisterDelivery = async (delivery_data) => {
            return new Promise(
                async (resolve) => {
                    setTimeout(
                        async () => {
                            const new_delivery = {
                                id: (
                                    String(
                                        (array_deliveries_data.length > 0)
                                            ? Math.max(...array_deliveries_data.map((delivery) => parseInt(delivery.id))) + 1
                                            : 1
                                    )
                                ),
                                ...delivery_data,
                                status: status_delivery.pending,
                                received_at: new Date(),
                                delivered_at: null,
                            };

                            const updated_data = [...array_deliveries_data, new_delivery];

                            await funcSaveDeliveries(updated_data);

                            resolve(new_delivery);

                        }, 500
                    );
                }
            );
        };

        const funcGetDeliveriesByUnit = async (unit_number) => {
            return new Promise(
                (resolve) => {
                    setTimeout(
                        () => {
                            const filtered = (
                                deliveriesData.filter(
                                    (delivery) => delivery.unit_number === unit_number)
                            );

                            const sortedData = (
                                [...filtered]
                                    .sort(
                                        (a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()
                                    )
                            );

                            resolve(sortedData);

                        }, 500);
                }
            );
        };

        return {
            funcUpdateDeliveryStatus,
            funcGetDeliveriesByUnit,
            funcRegisterDelivery,
            funcGetAllDeliveries,
            funcLoadInitialData,
            funcDeleteDelivery,
        };
    }
)();