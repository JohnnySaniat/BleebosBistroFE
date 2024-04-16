import { useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import getUserByUid from '../api/userData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [userDetails, setUserDetails] = useState([]);
  const { user } = useAuth();

  const getAuthenticatedUser = () => {
    getUserByUid(user.uid).then(setUserDetails);
  };

  useEffect(() => {
    getAuthenticatedUser();
  }, [user]);

  return (
    <>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {userDetails.map((userDetail) => <UserCard key={userDetail.id} userObj={userDetail} onUpdate={getAuthenticatedUser} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
