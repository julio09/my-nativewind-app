import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    );
}
registerRootComponent(Main);
