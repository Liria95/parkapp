import { useEffect, useReducer } from "react";
import AuthContext from "./auth-context";
import { AUTH_ACTIONS } from "./enums";
import { deleteUser, getUser, setUser } from "../../../../utils/secure-store";
import { User } from "../../../../services/AuthService";

interface Action {
    type: AUTH_ACTIONS
    payload?: any
}

interface State {
    isLoading: boolean,
    token: string | null,
    user: User | null,
    refreshToken: string | null,
}

const initialState = {
    isLoading: false, 
    token: null,
    user: null, 
    refreshToken: null 
}

const AuthProvider = (props:any) => { 
    
    
    const [state, dispatch] = useReducer((prevState: State, action: Action) => {
    
    const {payload} = action;

    switch (action.type){
        case AUTH_ACTIONS.LOGIN:
            console.log('Guardando usuario en SecureStore: ', payload.user); //agrego para verificar SecureStore
            if (payload?.user) setUser(payload.user);
            return{
                ...prevState,
                user: payload?.user ?? null,
                token: payload?.token ?? null,
                refreshToken: payload?.refreshToken ?? null,
            }
        
            // Restaurar sesión al iniciar la app
        case AUTH_ACTIONS.SET_USER: 
          return {
            ...prevState,
            user: payload?.user ?? null,
            token: payload?.token ?? null,
            refreshToken: payload?.refreshToken ?? null,
          };

        case AUTH_ACTIONS.LOGOUT:
            deleteUser()
            return initialState
            
        default:
            return prevState
    }
   }, initialState );

   useEffect(() => {
        // Restaurar sesión desde SecureStore
        getUser().then((user) => {
            console.log('Usuario recuperado de SecureStore:', user); //agrego para verificar SecureStore
            dispatch({ type: AUTH_ACTIONS.SET_USER, payload: { user } });
        }).catch(err => console.log('Error al recuperar usuario:', err));
    }, []);
    
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )  
}

export default AuthProvider