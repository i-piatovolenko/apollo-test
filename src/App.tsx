import React, {useState} from 'react';
import styles from './App.module.css';
import {GET_CLASSROOMS} from "./api/operations/queries/classrooms";
import {useMutation, useQuery} from "@apollo/client";
import {ClassroomType} from "./models/models";
import {OCCUPY_CLASSROOM} from "./api/operations/mutations/occupyClassroom";
import {FILL_DB} from "./api/operations/mutations/fillDB";
import {FREE_CLASSROOM} from "./api/operations/mutations/freeClassroom";
import {DISABLE_CLASSROOM} from "./api/operations/mutations/disableClassroom";
import {ENABLE_CLASSROOM} from "./api/operations/mutations/enableClassroom";

function App() {
  const [chosenClassroom, setChosenClassroom] = useState<string>('');
  const [num, setNum] = useState(10);
  const {data, loading, error} = useQuery(GET_CLASSROOMS);
  const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom,
        userId: 1,
        until: '2022-07-07T10:15:00Z',
      }
    }
  });
  const [freeClassroom] = useMutation(FREE_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom
      }
    }
  });
  const [disableClassroom] = useMutation(DISABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom,
        comment: 'Classroom disabled',
        until: '2022-07-07T10:15:00Z'
      }
    }
  });
  const [enableClassroom] = useMutation(ENABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom,
      }
    }
  });
  const [fillDB, {loading: loadingDB}] = useMutation(FILL_DB, {
    variables: {
      num
    }
  });

  const handleChoose = (name: string) => {
    setChosenClassroom(name);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p>Вибрана аудиторія: {chosenClassroom}</p>
        <button onClick={() => occupyClassroom()} disabled={!chosenClassroom}>Occupy</button>
        <button onClick={() => freeClassroom()} disabled={!chosenClassroom}>Free</button>
        <button onClick={() => disableClassroom()} disabled={!chosenClassroom}>Disable</button>
        <button onClick={() => enableClassroom()} disabled={!chosenClassroom}>Enable</button>
        <div className={styles.fillDB}>
          <p>Fill DB</p>
          <label>
            <input type="number" value={num} onChange={(e: any) => setNum(e.target.value)}/>
          </label>
          <button onClick={() => fillDB()} disabled={loadingDB}>{loadingDB ? 'wait' : 'refill DB'}</button>
        </div>
      </div>
      {!loading && !error && (
        <ul>
        {data.classrooms.map(({id, name, occupied, disabled}: ClassroomType) => (
          <li style={{backgroundColor: occupied ? '#FFF' : '#0F0', color: disabled ? '#CCC' : '#000'}}
              onClick={() => handleChoose(name)}
          >
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
