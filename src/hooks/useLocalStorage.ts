import {useState , useEffect} from 'react';
import { fetchAllMatches } from '../context/matches/action';
import { useMatchDispatch } from '../context/matches/context';


const getStoredValue = <T>(key: string, defaultValue: T): T => {
    const savedItem = localStorage.getItem(key);
    if (savedItem) {
      return JSON.parse(savedItem);
    }
    return defaultValue;
  };

  export const useLocalStorage = <T,>(
    key: string,
    defaultValue: T
  ): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState(() => {
      return getStoredValue(key, defaultValue);
    });
  const dispatch = useMatchDispatch();

  
    useEffect(() => {
      // const parsedvalue = JSON.parse(JSON.stringify(value))
      // console.log("parsedvalue"+parsedvalue.tasks[0].title);
      
      fetchAllMatches(dispatch);

      // localStorage.setItem(key, JSON.stringify(parsedvalue));
    }, [dispatch]);


  
    return [value, setValue];
  };

 