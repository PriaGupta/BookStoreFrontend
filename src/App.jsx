import Home from  './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'
// import Banner from './components/Banner';
import AllBooks from './pages/AllBooks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Favourites from './components/Profile/Favourites';
import ViewBookDetail from './components/ViewBookDetails';
import {Routes,Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/Settings';
import { Toaster } from 'react-hot-toast';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(()=>{
    if(localStorage.getItem("id") && 
       localStorage.getItem("token") &&
       localStorage.getItem("role")
  ) {
    dispatch(authActions.login());
    dispatch(authActions.changeRole(localStorage.getItem("role")));
  }
  },[] )

  return (
    <> 
    
      <Navbar/>
      <Toaster/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/allbooks' element={<AllBooks/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/profile' element={<Profile/>} >
       {role === "user" ? ( <Route index element={<Favourites/>} />) : ( <Route index element={<AllOrders/>} />)}
       {role === "admin" &&  <Route path='/profile/addbook' element={<AddBook/>} />}
        <Route path='/profile/orderHistory' element={<OrderHistory/>} />
        <Route path='/profile/settings' element={<Settings/>} />
      </Route>
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/updateBook/:id' element={<UpdateBook/>} />
      <Route path='/viewbookdetails/:id' element={<ViewBookDetail/>} />
      </Routes>
      <Footer/>  
    </>
  )
}

export default App
