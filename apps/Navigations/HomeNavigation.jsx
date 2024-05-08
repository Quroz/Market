import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={TabNavigation} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}