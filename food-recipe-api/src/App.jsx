import './App.css'
import { useEffect, useState } from 'react';

const url = 'https://api.github.com/users/americanoame';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const resp = await fetch(url);
      // fetch does not consider 404 as an error although 
      // we do have the successes response (setUser(user)
      // however it's not the user we're looking for 
      // the way around is essentially to look for the OK property
      // so if there's an error we can set again the state value
      if (!resp.ok) {
        setIsError(true);
        setIsLoading(false);
        return
      }
      const user = await resp.json();
      setUser(user);
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {   
    fetchUser();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>There was an error...</h2>;
  }

  // if i don't wanna do user.avatar_url user.login i just have 
  // to destructure like this (const {avatar_url, login} = user;)
  // so i can change the accordingly
  const {avatar_url, login} = user;
  return (
    <div className='d-flex justify-content-center'>
      <img style={{ width: '150px', borderRadius: '10px' }} 
      src={avatar_url} alt={user.name} />
      <h2>{login}</h2>
    </div>
  );
}

export default App;






