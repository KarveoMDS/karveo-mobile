import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {styled} from 'nativewind';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../hooks/store';
import {loginAction} from '../store/actions/auth.actions';
import KarveoScroll from '../../components/KarveoScroll';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const {isAuthenticated, error} = useAppSelector((state: any) => state.auth);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <View className="flex flex-col flex-1 ">
      <View className="w-full lg:w-1/2 h-48 lg:h-screen bg-primary flex flex-col items-center justify-center">
        <Image
          source={require('../../assets/largeLogo.png')}
          alt="Logo"
          className="w-10/12 mt-12"
          resizeMode={'contain'}
        />
      </View>
      <KarveoScroll>
        <View className="flex flex-col justify-start lg:justify-center h-full px-8">
          <Text className="text-2xl font-black text-center lg:text-left mt-4 mb-6">
            Bienvenue sur Karveo
          </Text>
          <Text className="text-lg text-center lg:text-left">
            Veuillez vous connecter pour accéder à votre espace personnel.
          </Text>
          <View className="flex flex-col gap-4 mt-8">
            <TextInput
              placeholder="Adresse mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onChange={e => {
                setEmail(e.nativeEvent.text);
              }}
              className="px-4 w-full lg:w-2/3 border h-12 rounded-xl border-slate-200"
            />
            <TextInput
              onChange={e => setPassword(e.nativeEvent.text)}
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Mot de passe"
              className="px-4 w-full lg:w-2/3 border h-12 rounded-xl border-slate-200"
            />
            <Pressable
              className="bg-primary flex items-center justify-center h-12 w-full rounded-xl mb-12"
              disabled={email == '' || password == ''}
              onPress={handleSubmit}>
              <Text className="text-white">Se connecter</Text>
            </Pressable>

            {/* <Pressable
              // onClick={() => navigate('/register')}
              className="w-full lg:w-2/3 h-12 mb-6 rounded-xl border border-primary flex items-center justify-center text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white duration-200">
              <Text className="text-center text-primary">
                Première Connexion ? Créer un compte
              </Text>
            </Pressable> */}
          </View>
        </View>
      </KarveoScroll>
    </View>
  );
};
export default Login;
