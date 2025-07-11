
import { ButtonPaper } from "../../components/common/ButtonPaper";
import { InputPaper } from "../../components/common/InputPaper";
import { AuthContext } from "../../context/AuthContext";
import { Alert, Text, View } from "react-native";
import { styles } from "./login-screen-styles";
import { useContext, useState } from "react";
import { LoginSchema } from "./LoginSchema";
import { Formik } from "formik";


export default function LoginScreen() {
    const { funcSignIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const initial_values__formik = {
        username: "",
        password: "",
    };

    const funcHandleLogin = async (_values) => {
        setLoading(true);

        try {
            await funcSignIn(_values.username, _values.password);
        }
        catch (error) {
            Alert.alert(
                "Erro de Login", error.message
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.c_container}>
            <Text style={styles.c_container__login_title}>
                Controle de Encomendas
            </Text>

            <Formik
                initialValues={initial_values__formik}
                validationSchema={LoginSchema}
                onSubmit={funcHandleLogin}
            >
                {
                    ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.c_container__login_form}>
                            <InputPaper
                                error={touched.username && !!errors.username}
                                onChangeText={handleChange("username")}
                                style={styles.c_login_form__input}
                                onBlur={handleBlur("username")}
                                value={values.username}
                                label={"Usuário"}
                                mode={"outlined"}
                            />

                            {
                                (touched.username && errors.username) && (
                                    <Text style={styles.c_login_form__error_text}>
                                        {errors.username}
                                    </Text>
                                )
                            }

                            <InputPaper
                                error={touched.password && !!errors.password}
                                onChangeText={handleChange("password")}
                                style={styles.c_login_form__input}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                secureTextEntry={true}
                                mode={"outlined"}
                                label={"Senha"}
                            />

                            {
                                (touched.password && errors.password) && (
                                    <Text style={styles.c_login_form__error_text}>
                                        {errors.password}
                                    </Text>
                                )
                            }

                            <ButtonPaper
                                style={styles.c_login_form__button}
                                onPress={handleSubmit}
                                disabled={loading}
                                mode={"outlined"}
                                loading={loading}
                                icon={"login"}
                            >
                                Entrar
                            </ButtonPaper>
                        </View>
                    )
                }
            </Formik>

            {/* exibição somente para fins didáticos */}
            <View style={styles.c_container__info_text}>
                <Text>
                    Use 'porteiro' com a senha '123' para testar.
                </Text>
            </View>
        </View>
    );
};