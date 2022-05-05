import React, {createContext, useState} from 'react';
import Backdrop from '../components/Backdrop';
import Loader from '../components/Loader';

const LoaderContext = createContext(null);
const {Provider} = LoaderContext;

const LoaderProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Provider
      value={{
        loading,
        setLoading,
      }}>
      {loading ? (
        <Backdrop>
          <Loader />
        </Backdrop>
      ) : null}
      {children}
    </Provider>
  );
};

export {LoaderContext, LoaderProvider};
