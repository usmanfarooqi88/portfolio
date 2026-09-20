import { createContext, useContext, useState } from 'react'

export type GridCols = 2 | 3

interface GridContextValue {
  cols: GridCols
  setCols: (cols: GridCols) => void
}

const GridContext = createContext<GridContextValue>({ cols: 3, setCols: () => {} })

export function GridProvider({ children }: { children: React.ReactNode }) {
  const [cols, setCols] = useState<GridCols>(() => {
    const stored = localStorage.getItem('grid-cols')
    return stored === '2' ? 2 : 3
  })

  const setColsPersist = (next: GridCols) => {
    setCols(next)
    localStorage.setItem('grid-cols', String(next))
  }

  return (
    <GridContext.Provider value={{ cols, setCols: setColsPersist }}>
      {children}
    </GridContext.Provider>
  )
}

export function useGrid() {
  return useContext(GridContext)
}
