import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
// Use next/dynamic to import the videocall component without ssr as the Agora SDK uses the window object
// The Videocall component can use the Agora SDK like in any react app
const App = dynamic(import('./Videocall'), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <App />
    </div>
  )
}

export default Home
