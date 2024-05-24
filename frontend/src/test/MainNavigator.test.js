// src/tests/App.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { AuthContext } from '../context/AuthProvider';
import AppStack from '../navigation/AppStack';
import GuestStack from '../navigation/GuestStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../core/theme';

// Mock the AppStack and GuestStack components
jest.mock('../navigation/AppStack', () => {
  return jest.fn().mockImplementation(() => {
    return null;
  });
});

jest.mock('../navigation/GuestStack', () => {
  return jest.fn().mockImplementation(() => {
    return null;
  });
});

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {ui}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('App', () => {
  it('renders AppStack when loggedInUser is present', () => {
    const providerProps = {
      value: { loggedInUser: { uid: '123', email: 'test@example.com' }, setLoggedInUser: jest.fn() }
    };
    customRender(<App />, { providerProps });
    expect(AppStack).toHaveBeenCalled();
  });

  it('renders GuestStack when loggedInUser is null', () => {
    const providerProps = {
      value: { loggedInUser: null, setLoggedInUser: jest.fn() }
    };
    customRender(<App />, { providerProps });
    expect(GuestStack).toHaveBeenCalled();
  });
});
