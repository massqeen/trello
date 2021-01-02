import React, {
  ComponentType,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { load } from '../../utils/api/api';
import { AppState, appData } from '../AppState';

export const withLoadedData = (
  WrappedComponent: ComponentType<PropsWithChildren<{ initialState: AppState }>>
) => {
  return ({ children }: PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const [initialState, setInitialState] = useState<AppState>(appData);

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState(data);
        } catch (e) {
          setError(e);
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, []);
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (error) {
      console.log(error.message);
    }
    return (
      <WrappedComponent initialState={initialState}>
        {children}
      </WrappedComponent>
    );
  };
};
