
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { ButtonPaper } from "./components/common/ButtonPaper";
import { DeliveryModel } from "./models/DeliveryModel";
import { AuthContext } from "./context/AuthContext"
import { AuthService } from "./models/AuthModel";
import { colors } from "./styles/color-globals";
import { useEffect, useState } from "react";
import { styles } from "./App-styles";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
    const [user, setUser] = useState(null);
    const [app_ready, setAppReady] = useState(false);

    useEffect(
        () => {
            const prepareApp = async () => {
                try {
                    await DeliveryModel.funcLoadInitialData();
                }
                catch (e) {
                    console.warn(e);
                }
                finally {
                    setAppReady(true);
                }
            };

            prepareApp();

        }, []
    );

    const funcSignIn = async (username, password) => {
        try {
            const _response = (
                await AuthService.funcLogin(username, password)
            );

            setUser(_response.user);
        }
        catch (error) {
            throw (error);
        }
    };

    const funcSignOut = () => {
        setUser(null);
    };

    if (!app_ready) {
        return (
            <View style={styles.c_loading_container}>
                <ActivityIndicator
                    color={colors._6200EE}
                    size={"large"}
                />

                <Text style={styles.c_loading_container__text}>
                    Carregando dados...
                </Text>
            </View>
        );
    }

    return (
        <PaperProvider>
            <AuthContext.Provider value={{ user, funcSignIn, funcSignOut }}>
                <NavigationContainer>
                    <AppNavigator />

                    {
                        user && (
                            <SafeAreaView style={styles.c_logout_button_safe_area}>
                                <View style={styles.c_logout_button_safe_area__button_container}>
                                    <ButtonPaper
                                        onPress={funcSignOut}
                                        mode={"outlined"}
                                        icon={"logout"}
                                    >
                                        Sair
                                    </ButtonPaper>
                                </View>
                            </SafeAreaView>
                        )
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
    );
};