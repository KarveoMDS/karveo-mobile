import {KeyboardAvoidingView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KarveoScroll = ({children}) => {
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KarveoScroll;
