// When adding new pages, always add them here
// This is setting up the router

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home';
import About from '../../pages/About';
import MyWork from '../../pages/MyWork';
import VisitorRegistrationApp from '../../pages/casestudies/VisitorRegistrationApp';
import DesignSprint from '../../pages/casestudies/DesignSprint';
import DesignWorksopFacilitation from '../../pages/casestudies/DesignWorksopFacilitation';
import CredidCardForm from '../../pages/casestudies/CredidCardForm';
import UsabilityTesting from '../../pages/casestudies/UsabilityTesting';
import SettingsPage from '../../pages/casestudies/SettingsPage';
import NoMatch from '../../pages/NoMatch';
import Navigation from '../Navigation';
import Footer from '../Footer';

import './global-styles';

//see index.js in Navigation for the patterns being matched
const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about_vedran" component={About} />
      <Route path="/vedrans_design_work" component={MyWork} />
      <Route path="/visitor_registration_app" component={VisitorRegistrationApp} />
      <Route path="/seek_design_sprint" component={DesignSprint} />
      <Route path="/design_workshop_facilitation_with_rubicon" component={DesignWorksopFacilitation} />
      <Route path="/seek_credit_card_form_redesign" component={CredidCardForm} />
      <Route path="/usability_testing_with_kolektiv" component={UsabilityTesting} />
      <Route path="/gymsales_settings_page" component={SettingsPage} />
      <Route component={NoMatch} />
    </Switch>
    <Footer />
  </div>
);

export default App;
