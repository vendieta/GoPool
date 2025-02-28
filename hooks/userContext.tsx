import { useState , useEffect, createContext, ReactNode, Profiler, useContext } from "react";
import { supabase } from '@/supabaseClient';
import { Session } from "@supabase/supabase-js";
import { RectButton } from "react-native-gesture-handler";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";


export interface UserProfile{
  userName: string;
};

export interface UserInfo{
  session: Session| null;
  profile: UserProfile | null;
}

const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
});

export function AuthProvider ({children} : {children : ReactNode}) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    session: null,
    profile: null,
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data : { session }}) => {
      setUserInfo({...userInfo, session});
    });
    supabase.auth.onAuthStateChange((_event , session) => {
      setUserInfo({session , profile: null});
    });
  }, []);

  return(
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  )
}

export function useUserInfo() {
  return useContext(UserContext);
}

// export default function UserContext(){
//   const [ data , setData] = useState<any[]>([]); // Estado para almacenar los datos
//     const [error, setError] = useState<string>(''); // Estado para manejar errores
//     const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
  
//     const fetchData = async () => {
//       const { data, error } = await supabase
//       .from('cardData') // Especifica tu tabla aquí
//       .select('*'); // O especifica las columnas que quieres recuperar
      
//       if (error) {
//         setError(error.message); // Si hay un error, lo guardamos en el estado
//         return;
//       }
      
//       setData(data); // Si todo va bien, guardamos los datos
//       console.log(data[2])
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, []); // Este efecto se ejecutará solo una vez, al montar el componente
//   return(

//   );
// }
