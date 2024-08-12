import React, { useEffect } from 'react';
import Header from '../UI/header'; 

const Layout = ({ children }: { children: React.ReactNode }) => {  

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
