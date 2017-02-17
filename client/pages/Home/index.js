import React from 'react';

import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Section from '../../components/Section';
import Link from '../../components/Link';
import Paragraph from '../../components/Paragraph';
import HomeHeader from '../../components/HomeHeader';

const Home = () => (

  <div>
    <HomeHeader />
    <Section first>
      <H2>My work</H2>
      <Paragraph narrow>
        A collection of case studies focusing on my design process, as well as side projects I do out of a love of design and a passion for continued learning.
      </Paragraph>
      <Link href="/vedrans_design_work">Explore my design work</Link>
    </Section>

    <Section>
      <H2>Writing</H2>
      <Paragraph narrow>
        Writing about design is a big part of my self-development. It helps me improve by questioning my own beliefs, sharing knowledge and creating dialogue.
      </Paragraph>
      <Link target="_blank" href="http://medium.com/@vedranio">Read my posts on Medium</Link>
    </Section>

    <Section last>
      <H2>Design community</H2>
      <Paragraph narrow>
        I am actively involved in local design meetups, have <Link target="_blank" href="http://www.sarajevoux.design">founded one myself</Link> and love sharing ideas and learning about other designers’ processes.
      </Paragraph>
      <Link target="_blank" href="http://www.slideshare.net/ThatBaldUXGuy/">Browse my presentations</Link>
    </Section>
  </div>

);

export default Home;
