import React from 'react';
import '../App.css';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import LeafletMapComponent from '../Components/LeafletMapComponent';
import DrawerComponent from '../Components/DrawerComponent';

function LeafletMap() {
  const { isAuthenticated, logout, user } = useAuth0();
  return (
    <div className="LeafletMap">
      <>
        <div>
        </div>
        <DrawerComponent logout={logout} avatarimage={ user.picture } name={ user.name  } content={LeafletMapComponent}></DrawerComponent>
      </>
    </div>
  );
}
export default withAuthenticationRequired(LeafletMap);
