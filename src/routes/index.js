import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login.js';
import Main from '../screens/main.js';
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
                name='Main'
                component={Main}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name='RedefSenha'
                component={RedefSenha}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}
