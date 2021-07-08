import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const {loading, data, refetch} = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'});
  const placeholderData = {
    edges: [
      {
        node: {
          id: "0"
        }
      }
    ]
  };

  return { repositories: loading ? placeholderData : data.repositories, loading, refetch };
};

export default useRepositories;