import * as SecureStore from 'expo-secure-store';
import { User } from '../services/AuthService';

const STORAGE_NAME = "parkapp"

export const STORAGE_KEYS = {
    JWT_TOKEN: 'JWTtOKEN',
    USER: 'user',
    JWT_REFRESH_TOKEN: 'jwtRefreshToken',
    DEVICE_ID: 'deviceId'
}

// Guardar item
const _setItem = (key: string, value: string, options?: any) =>
   SecureStore.setItemAsync(`${STORAGE_NAME}${key}`, value, options);

//Obtener item
const _getItem = (key: string) => 
    SecureStore.getItemAsync(`${STORAGE_NAME}${key}`);

//elimina item
const _deleteItem = (key: string) =>
    SecureStore.deleteItemAsync(`${STORAGE_NAME}${key}`);


const setUser = (user: User) => 
    _setItem(STORAGE_KEYS.USER, JSON.stringify(user));

//función asincrónica q devuelve una promesa de algo
const getUser = async (): Promise<User | null> => {
    const user = await _getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
};

const deleteUser = () => _deleteItem(STORAGE_KEYS.USER);
 
export { setUser, getUser, deleteUser }




