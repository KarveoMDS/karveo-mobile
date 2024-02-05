import {View} from 'react-native';
import AgendaComponent from './AgendaComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}} className="bg-white">
      <AgendaComponent />
    </SafeAreaView>
  );
};

export default Home;
