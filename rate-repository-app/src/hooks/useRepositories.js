import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const {loading, data, refetch} = useQuery(GET_REPOSITORIES);

  return { repositories: data ? data.repositories: {}, loading, refetch };
};

export default useRepositories;