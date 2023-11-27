import React from "react";
import {
  AuthReducerEnum,
  IAuthReducerAction,
  IAuthReducerState,
  IUser,
  IUserSignIn,
  IUserSignUp,
  IUserSigned,
} from "@models/Auth";
import * as SecureStore from "expo-secure-store";
import { IError } from "@models/Request";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { UseAuth } from "@services";
import { Instance } from "@config";

const initialAuthState: IAuthReducerState = {
  loading: false,
  data: {
    user: {
      id: "",
      username: "",
      email: "",
      birth_date: "",
      gender: "",
      phone: "",
      period: "",
      specialties: "",
      company_id: "",
      course_id: "",
      accept_promotions: false,
      accept_term: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    token: "",
  },
  error: "",
};

interface IAuthContext {
  SignIn: (data: IUserSignIn) => void;
  SignOut: () => void;
  SignUp: (data: IUserSignUp) => void;
  state: IAuthReducerState;
  dispatch: React.Dispatch<IAuthReducerAction>;
}

interface IContextProviderProps {
  children: React.ReactNode;
}

const initialValues: IAuthContext = {
  SignIn: () => {},
  SignOut: () => {},
  SignUp: () => {},
  state: initialAuthState,
  dispatch: () => {},
};

const AuthContext = React.createContext<IAuthContext>(initialValues);

const AuthReducer = (
  state: IAuthReducerState,
  action: IAuthReducerAction
): IAuthReducerState => {
  switch (action.type) {
    case AuthReducerEnum.LOADING:
      return { ...state, loading: action.payload as boolean, error: "" };
    case AuthReducerEnum.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload as IUserSigned,
        error: "",
      };
    case AuthReducerEnum.ERROR:
      return { ...state, loading: false, error: action.payload as string };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: IContextProviderProps) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialAuthState);
  const { userSignIn, userSignUp } = UseAuth();
  const { navigate } = useNavigation();

  const SignInMutation = useMutation<IUserSigned, IError, IUserSignIn>(
    userSignIn
  );
  const SignUpMutation = useMutation<IUser, IError, IUserSignUp>(userSignUp);

  const SignIn = (data: IUserSignIn) => {
    dispatch({
      type: AuthReducerEnum.LOADING,
      payload: true,
    });

    SignInMutation.mutate(data, {
      onSuccess: (data) => {
        SecureStore.setItemAsync("user-authenticated", JSON.stringify(data));
        dispatch({
          type: AuthReducerEnum.SUCCESS,
          payload: data,
        });
      },
      onError: (error: IError) => {
        console.log(error);

        dispatch({
          type: AuthReducerEnum.ERROR,
          payload: error.message,
        });
      },
    });
  };

  // console.log(state);

  const SignUp = (data: IUserSignUp) => {
    dispatch({
      type: AuthReducerEnum.LOADING,
      payload: true,
    });
    SignUpMutation.mutate(data, {
      onSuccess: () => {
        SignIn({
          email: data.email,
          password: data.password,
        });
      },
      onError: (error: IError) => {
        dispatch({
          type: AuthReducerEnum.ERROR,
          payload: error.message,
        });
      },
    });
  };

  const SignOut = async () => {
    try {
      await SecureStore.deleteItemAsync("user-authenticated");
      dispatch({
        type: AuthReducerEnum.SUCCESS,
        payload: initialValues.state.data,
      });
    } catch (error) {
      return error;
    } finally {
      navigate("SIGN_IN" as never);
    }
  };

  React.useEffect(() => {
    SecureStore.getItemAsync("user-authenticated").then((data) => {
      if (data) {
        dispatch({
          type: AuthReducerEnum.SUCCESS,
          payload: JSON.parse(data),
        });
        Instance.defaults.headers.common["authorization"] =
          "Bearer " + JSON.parse(data).token;
      }
    });
  }, []);

  const contextValue: IAuthContext = {
    SignIn,
    SignOut,
    SignUp,
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
