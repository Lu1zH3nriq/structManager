import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login.js';
import Home from '../screens/home.js';
import RedefSenha from '../screens/redefSenha.js';


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{headerShown : false}}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='RedefSenha'
                component={RedefSenha}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}
