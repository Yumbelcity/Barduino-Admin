import React, { Component } from 'react'
import { Alert } from 'react-native'
import PedidosScreen from '../screens/Pedidos/Pedidos'
import PreparadosScreen from '../screens/Pedidos/Preparados'
import UsuariosScreen from '../screens/Pedidos/Usuarios'
import DetalleUsuariosScreen from '../screens/Pedidos/DetalleUsuarios'
import LogoutScreen from '../screens/Logout'
import PersonalizarTragoScreen from '../screens/Pedidos/DetailRestaurant'
import PagarPedidosScreen from '../screens/Pedidos/PagarPedidos'
import ProfileScreen from '../screens/Profile'
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'rgba(200, 38, 74, 1)',
    },
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      color: '#fff',
    }
  }
}

const backIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginLeft: 20 }}
  size={20}
  color='white'
  onPress={() => navigation.navigate('ListarUsuarios')}
/>

const logoutIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginRight: 20 }}
  size={25}
  color='white'
  onPress={() => Alert.alert(
    '¿Deseas cerrar tu Sesión?',
    'Tendrás que volver a iniciarla con tu correo y contraseña',
    [
      {
        text: 'Cerrar Sesión', onPress: () => navigation.navigate('Logout'),
        style: 'destructive'
      },
      {
        text: 'Cancelar', style: 'cancel'
      },
    ]
  )}
/>

const payIcon = (navigation, icon) => <Icon
  name={icon}
  style={{ marginRight: 20 }}
  size={25}
  color='white'
  onPress={() => Alert.alert(
    'Cobrar al Usuario',
    'Asegurate de cobrar el monto correcto.\nUna vez pagado los pedidos de este usuario serán borrados',
    [
      {
        text: 'Pagado', onPress: () => {
          const { params } = navigation.state
          const usuario = params.usuario
          navigation.navigate('Pagar', { usuario })
        },
        style: 'destructive'
      },
      {
        text: 'Cancelar', style: 'cancel'
      },
    ]
  )}
/>

const usuariosScreenStack = createStackNavigator(
  {
    ListarUsuarios: {
      screen: UsuariosScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Usuarios',
        headerRight: logoutIcon(navigation, 'sign-out')
      })
    },
    PedidosUsuario: {
      screen: DetalleUsuariosScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Tragos Pedidos',
        headerRight: payIcon(navigation, 'money'),
        headerLeft: backIcon(navigation, 'arrow-left'),
      })
    },
    Logout: {
      screen: LogoutScreen
    },
    Pagar: {
      screen: PagarPedidosScreen
    }
  },
  navigationOptions
)

const pendientesScreenStack = createStackNavigator(
  {
    ListarPendientes: {
      screen: PedidosScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Tragos Pendientes',
        headerRight: logoutIcon(navigation, 'sign-out')
      })
    }
  },
  navigationOptions
)

const preparadosScreenStack = createStackNavigator(
  {
    ListarPreparados: {
      screen: PreparadosScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Tragos Listos',
        headerRight: logoutIcon(navigation, 'sign-out')
      })
    }
  },
  navigationOptions
)

// export default createDrawerNavigator(
export default createBottomTabNavigator(
  {
    Usuarios: {
      screen: usuariosScreenStack
    },
    Pendientes: {
      screen: pendientesScreenStack
    },
    Listos: {
      screen: preparadosScreenStack
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Pendientes') {
          iconName = `ios-time${focused ? '' : '-outline'}`;
        } else if (routeName === 'Listos') {
          iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Usuarios') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      tabStyle: {
        backgroundColor: 'rgba(200, 38, 74, 1)',
      },
      activeTintColor: 'rgba(255, 255, 255, 0.9)',
      inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
    }
  }
)