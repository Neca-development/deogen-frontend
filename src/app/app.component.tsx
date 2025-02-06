import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}
