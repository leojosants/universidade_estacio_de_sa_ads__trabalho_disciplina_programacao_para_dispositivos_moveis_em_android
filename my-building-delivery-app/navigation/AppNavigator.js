
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import { useContext } from "react";
import RegisterDeliveryScreen from "../screens/Deliveries/RegisterDeliveryScreen/RegisterDeliveryScreen";
import AllDeliveriesScreen from "../screens/Deliveries/AllDeliveriesScreen/AllDeliveriesScreen";
import LoginScreen from "../screens/Auth/LoginScreen";


const Stack = createStackNavigator();

export default function AppNavigator() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    component={LoginScreen}
                    name={"login"}
                />
            </Stack.Navigator>
        );
    }

    if (user.role === ROLES.DOORMAN) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    component={RegisterDeliveryScreen}
                    name={"RegisterDelivery"}
                />

                <Stack.Screen
                    component={AllDeliveriesScreen}
                    name={"AllDeliveries"}
                />
            </Stack.Navigator>
        );
    }

    // return (
    //     <Stack.Navigator screenOptions={{ headerShown: false }}>
    //         <Stack.Screen name="AllDeliveries" component={AllDeliveriesScreen} />
    //     </Stack.Navigator>
    // );
};