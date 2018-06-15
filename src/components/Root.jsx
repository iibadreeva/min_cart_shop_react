import React from 'react';
import {IntlProvider, addLocaleData} from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import App from './App'
import store from './../store'
import {Provider} from 'react-redux'

addLocaleData(ru);

function Root() {
    return(
        <Provider store={store}>
        	<IntlProvider locale="ru">
            <App />
          </IntlProvider>
        </Provider>
    )
}

export default Root;