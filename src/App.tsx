import React from 'react';
import styles from './App.module.css';
import {GET_CLASSROOMS} from "./api/operations/queries/classrooms";
import {useQuery} from "@apollo/client";
import {ClassroomType} from "./models/models";

function App() {
  const {data, loading, error} = useQuery(GET_CLASSROOMS);

  return (
    <div className={styles.wrapper}>
      {!loading && !error && (
        <ul>
        {data.classrooms.map(({id, name, occupied, disabled}: ClassroomType) => (
          <li>
            <p>
              <b>ID:</b> {id}
            </p>
            <p>
              <b>Name:</b> {name}
            </p>
            <p>
              <b>Occupied:</b> {occupied ? 'Yes' : 'No'}
            </p>
            <p>
              <b>Disabled:</b> {disabled ? 'Yes' : 'no'}
            </p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default App;
