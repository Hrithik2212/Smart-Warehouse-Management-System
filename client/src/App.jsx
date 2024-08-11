import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ManagerDashboard from './pages/Dashboards/manager/ManagerDashboard'
import CrewDashboard from './pages/Dashboards/crew/CrewDashboard'
import DriverDashboard from './pages/Dashboards/driver/DriverDashboard'
import SupervisorDashboard from './pages/Dashboards/supervisor/SupervisorDashboard'
import Landing from './pages/Landing/Landing'
import './App.css'
import Login from './pages/Login/Login'
import { AuthProvider } from './context/AuthContext'
import AdminDashboard from './pages/Dashboards/admin/AdminDashboard'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthProvider />,
      children: [
        {
          path: '/',
          element: <Landing />
        },
        {
          path: '/login',
          element: <Login />
        },

        {
          path: '/admin',
          element: <AdminDashboard />,
          children: [
            {
              path: ":page",
              element: <AdminDashboard />
            }
          ]
        },

        {
          path: '/manager',
          element: <ManagerDashboard />,
          children: [
            {
              path: ":page",
              element: <ManagerDashboard />
            }
          ]
        },
        {
          path: '/crew',
          element: <CrewDashboard />,
          children: [
            {
              path: ":page",
              element: <CrewDashboard />
            }
          ]
        },
        {
          path: '/driver',
          element: <DriverDashboard />,
          children: [
            {
              path: ":page",
              element: <DriverDashboard />
            }
          ]
        },
        {
          path: '/supervisor/',
          element: <SupervisorDashboard />,
          children: [
            {
              path: ":page",
              element: <SupervisorDashboard />
            }
          ]
        },
      ]

    }
  ])

  return (
   
    <RouterProvider router={router} />
    
  )
}

export default App
