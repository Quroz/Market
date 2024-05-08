import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Login from '../Screens/Login';

const Stack = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}