import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/login.js";
import Main from "../screens/main.js";
import RedefSenha from "../screens/redefSenha.js";

import CadCliente from "../screens/cadastrosScreens/cadastroCliente.js";
import CadFuncionario from "../screens/cadastrosScreens/cadastroFuncionario.js";
import CadEquipamento from "../screens/cadastrosScreens/cadastroEquipamento.js";
import CadTipoObra from "../screens/cadastrosScreens/cadastroTipoObra.js";
import CadNovaObra from "../screens/cadastrosScreens/cadastroNovaObra.js";
import DetailsObra from "../screens/detailsObra/geralScreen.js";

import UpdateObra from "../screens/detailsObra/updateObra.js";
import MateriaisObra from "../screens/detailsObra/materialScreen";
import FuncionarioObra from "../screens/detailsObra/funcionarioScreen.js";
import EquipamentoObra from "../screens/detailsObra/equipamentoScreen.js";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="RedefSenha"
        component={RedefSenha}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CadastraCliente"
        component={CadCliente}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastraFuncionario"
        component={CadFuncionario}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastraEquipamento"
        component={CadEquipamento}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastraTipodeObra"
        component={CadTipoObra}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CadastraNovaObra"
        component={CadNovaObra}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DetailsObra"
        component={DetailsObra}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UpdateObra"
        component={UpdateObra}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MateriaisObra"
        component={MateriaisObra}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FuncionariosObra"
        component={FuncionarioObra}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EquipamentosObra"
        component={EquipamentoObra}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
