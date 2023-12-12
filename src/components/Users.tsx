import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from '@ionic/react';
import React from 'react';
import { useEffect, useState } from 'react';

type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.error('Something went wrong:', error));
  }, []);

  function handleRemoveUser(index: number) {
    setUsers((prevUsers) => prevUsers.filter((user, idx) => idx !== index));
  }

  return (
    <IonList>
      {users.map((user, index) => (
        <IonItemSliding key={index}>
          <IonItem>
            <IonLabel>
              <h2>{`${user.name.first} ${user.name.last}`}</h2>
              <p>{user.email}</p>
            </IonLabel>
          </IonItem>
          <IonItemOptions side='end'>
            <IonItemOption onClick={() => handleRemoveUser(index)}>
              Remove
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default Users;
