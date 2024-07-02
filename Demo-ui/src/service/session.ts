interface SessionData {
    UserID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Username: string;
    Active: string;    
  }
  
  export const setSessionData = (data: SessionData) => {
    localStorage.setItem('sessionData', JSON.stringify(data));
  };
  
  export const getSessionData = (): SessionData | null => {
    const sessionData = localStorage.getItem('sessionData');
    return sessionData ? JSON.parse(sessionData) : null;
  };

  export const clearSessionData = () => {
    localStorage.removeItem('sessionData');
    localStorage.removeItem('sessionUser');
  };

  export const setSessionuser = (data: SessionData) => {
    localStorage.setItem('sessionUser', JSON.stringify(data));
  };

  export const getSessionuser = function() {
    const sessionData = localStorage.getItem('sessionUser');
    return sessionData ? JSON.parse(sessionData) : null;
  };