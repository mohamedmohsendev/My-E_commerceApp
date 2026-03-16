
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return <>
  <Navbar/>
  <div className='md:pt-[75px] pt-[65px] min-h-screen bg-gray-50 flex flex-col'>
    <div className='flex-grow w-full'>
      <Outlet/>
    </div>
  </div>
  <Footer/>
  </>
}
