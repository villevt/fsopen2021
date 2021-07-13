import { useApolloClient, useMutation } from "@apollo/client";

import { AUTHORIZE_USER } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE_USER);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const {data} = await mutate({variables: {username, password}});
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;