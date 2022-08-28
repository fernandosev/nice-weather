import React from 'react';

// Components
import Header from '~/components/Header';

// Styles
import {Container, SafeAreaHeader, SafeAreaBody, Scroll} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <SafeAreaHeader>
        <Header title="Nice Weather" />
      </SafeAreaHeader>

      <SafeAreaBody>
        <Scroll />
      </SafeAreaBody>
    </Container>
  );
};

export default Home;
