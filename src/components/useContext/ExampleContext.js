import React, { createContext, useState } from 'react'

const dataFixed ={

name:'Michael',
age: 24

}

export const DataContext = createContext();




 export const DataProvider = ({children}) => {
  const [data,setData] = useState(dataFixed);

  return (

<DataContext.Provider value={{
data,
setData
}}>
  {children}
    </DataContext.Provider>
  )

}

