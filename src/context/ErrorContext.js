import React, {createContext, useState} from 'react';
import Backdrop from '../components/Backdrop';
import Alert from '../components/Alert';

const ErrorContext = createContext(null);
const {Provider} = ErrorContext;

const ErrorProvider = ({children}) => {
  const [error, setError] = useState(null);

  return (
    <Provider
      value={{
        error,
        setError,
      }}>
      {error ? (
        <Backdrop onPress={() => setError(null)}>
          <Alert initialValues={{title: 'Oh ohh...', description: error}} />
        </Backdrop>
      ) : null}
      {children}
    </Provider>
  );
};

export {ErrorContext, ErrorProvider};
