
import { DeliveryModel } from "../../../models/DeliveryModel";
import { Alert, ScrollView, Text, View } from "react-native";
import { ButtonPaper } from "../../../components/common/ButtonPaper";
import { styles } from "./register-delivery-screen-style";
import { InputPaper } from "../../../components/common/InputPaper";
import { DeliverySchema } from "./DeliverySchema";
import { Appbar } from "react-native-paper";
import { useState } from "react";
import { Formik } from "formik";


export default function RegisterDeliveryScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const initial_Values__formik = {
        quantity_units: "1",
        addressee_name: "",
        unit_number: "",
        description: ""
    };


    const funcHandleRegister = async (_values, { resetForm }) => {
        setLoading(true);

        try {
            await DeliveryModel.funcRegisterDelivery(_values);
            Alert.alert("Sucesso!", "Encomenda registrada com sucesso!");
            resetForm();
        }
        catch (error) {
            Alert.alert("Erro", "Não foi possível registrar a encomenda. Tente novamente.");
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.c_container}>
            <Appbar.Header style={styles.c_container__app_bar}>
                <Appbar.Content title={"Registrar Encomenda"} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.c_container__scroll_content}>
                <Text style={styles.c_scroll_content__screen_title}>
                    Registrar Nova Encomenda
                </Text>

                <Formik
                    initialValues={initial_Values__formik}
                    validationSchema={DeliverySchema}
                    onSubmit={funcHandleRegister}
                >
                    {
                        ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.c_scroll_content__form_container}>
                                <InputPaper
                                    error={touched.unit_number && !!errors.unit_number}
                                    label={"Apartamento a receber encomenda"}
                                    onChangeText={handleChange("unit_number")}
                                    style={styles.c_form_container__input}
                                    onBlur={handleBlur("unit_number")}
                                    value={values.unit_number}
                                    keyboardType={"numeric"}
                                    mode={"outlined"}
                                />

                                {
                                    touched.unit_number && errors.unit_number && (
                                        <Text style={styles.c_form_container__error_text}>
                                            {errors.unit_number}
                                        </Text>
                                    )
                                }

                                <InputPaper
                                    error={touched.addressee_name && !!errors.addressee_name}
                                    onChangeText={handleChange("addressee_name")}
                                    style={styles.c_form_container__input}
                                    onBlur={handleBlur("addressee_name")}
                                    value={values.addressee_name}
                                    label={"Nome da pessoa"}
                                    mode={"outlined"}
                                />

                                {
                                    touched.addressee_name && errors.addressee_name && (
                                        <Text style={styles.c_form_container__error_text}>
                                            {errors.addressee_name}
                                        </Text>
                                    )
                                }

                                <InputPaper
                                    error={touched.quantity_units && !!errors.quantity_units}
                                    onChangeText={handleChange("quantity_units")}
                                    style={styles.c_form_container__input}
                                    onBlur={handleBlur("quantity_units")}
                                    label={"Quantidade de unidades"}
                                    value={values.quantity_units}
                                    keyboardType={"numeric"}
                                    mode={"outlined"}
                                />

                                {
                                    touched.quantity_units && errors.quantity_units && (
                                        <Text style={styles.c_form_container__error_text}>
                                            {errors.quantity_units}
                                        </Text>
                                    )
                                }

                                <InputPaper
                                    error={touched.description && !!errors.description}
                                    onChangeText={handleChange("description")}
                                    style={styles.c_form_container__input}
                                    onBlur={handleBlur("description")}
                                    value={values.description}
                                    label={"Descrição"}
                                    numberOfLines={3}
                                    mode={"outlined"}
                                    multiline={true}
                                />

                                {
                                    touched.description && errors.description && (
                                        <Text style={styles.c_form_container__error_text}>
                                            {errors.description}
                                        </Text>
                                    )
                                }

                                <ButtonPaper
                                    style={styles.c_form_container__action_button}
                                    onPress={handleSubmit}
                                    icon={"plus-circle"}
                                    mode={"contained"}
                                    disabled={loading}
                                    loading={loading}
                                >
                                    Registrar Encomenda
                                </ButtonPaper>
                            </View>
                        )
                    }
                </Formik>

                <ButtonPaper
                    onPress={() => navigation.navigate("AllDeliveries")}
                    icon={"format-list-bulleted"}
                    mode={"outlined"}
                    style={styles.c_scroll_content__view_all_deliveries_button}
                >
                    Ver Todas as Encomendas
                </ButtonPaper>
            </ScrollView>
        </View>
    );
};