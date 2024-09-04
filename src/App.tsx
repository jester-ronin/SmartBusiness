import './App.css';
import Tables from './components/tables/Tables'
import Header from './components/header/Header';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Tables />
      </div>
    </Provider>
  );
}

export default App;
