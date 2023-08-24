import {useState , useEffect} from 'react';


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
  
    useEffect(() => {
      const parsedvalue = JSON.parse(JSON.stringify(value))
      // console.log("parsedvalue"+parsedvalue.tasks[0].title);
      for(let i=0;i<parsedvalue.tasks.length;i++){
        parsedvalue.tasks[i].id=i;
      }

      localStorage.setItem(key, JSON.stringify(parsedvalue));
    }, [key, value]);
  
    return [value, setValue];
  };

 