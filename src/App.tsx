import React, {useEffect, useState} from 'react';
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
  const [disable, setDisable] = useState(false);
  const [num, setNum] = useState(10);
  const {data, loading, error} = useQuery(GET_CLASSROOMS);

  const [occupyClassroom, {loading: loadingOccupy}] = useMutation(OCCUPY_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom,
        userId: 1,
        until: '2022-07-07T10:15:00Z',
      }
    }
  });

  const [freeClassroom, {loading: loadingFree}] = useMutation(FREE_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom
      }
    }
  });

  const [disableClassroom, {loading: loadingDisable}] = useMutation(DISABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom,
        comment: 'Classroom disabled',
        until: '2022-07-07T10:15:00Z'
      }
    }
  });

  const [enableClassroom, {loading: loadingEnable}] = useMutation(ENABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: chosenClassroom,
      }
    }
  });

  const [fillDB, {loading: loadingDB}] = useMutation(FILL_DB, {
    variables: {
      num: parseInt(num as unknown as string)
    },
    refetchQueries: [{query: GET_CLASSROOMS}]
  });

  const handleChoose = (name: string) => {
    setChosenClassroom(name);
  };

  useEffect(() => {
    setDisable(loadingDB || loadingDisable || loadingEnable || loadingFree || loadingOccupy || loading);
  }, [loadingDB, loadingDisable, loadingEnable, loadingFree, loadingOccupy, loading]);

  return (
    <div className={styles.wrapper}>
      <div>
        <p>Вибрана аудиторія: {chosenClassroom}</p>
        <button onClick={() => occupyClassroom()} disabled={disable || !chosenClassroom}>Occupy</button>
        <button onClick={() => freeClassroom()} disabled={disable || !chosenClassroom}>Free</button>
        <button onClick={() => disableClassroom()} disabled={disable || !chosenClassroom}>Disable</button>
        <button onClick={() => enableClassroom()} disabled={disable || !chosenClassroom}>Enable</button>
        <div className={styles.fillDB}>
          <p>Fill DB</p>
          <label>
            <input type="number" value={num} onChange={(e: any) => setNum(e.target.value)}/>
          </label>
          <button onClick={() => fillDB()} disabled={disable}>{disable ? 'wait' : 'refill DB'}</button>
        </div>
      </div>
      {!loading && !error && (
        <ul>
          {data.classrooms.slice().sort((a: ClassroomType, b: ClassroomType) => Number(a.name) - Number(b.name))
            .map(({id, name, occupied, disabled}: ClassroomType) => (
              <li style={{backgroundColor: disable && chosenClassroom === name ? '#fff' : occupied ? '#FFF' : '#0F0',
                color: disabled ? '#CCC' : '#000', display: 'flex', justifyContent: 'center', alignItems: 'center',
              borderWidth: chosenClassroom === name ? 2 : 1}}
                  onClick={() => handleChoose(name)} key={id}
              >
                {disable && chosenClassroom === name ?
                  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
                       alt="loading" width={48}/>
                  : <div>
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
                  </div>}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
