import React, { useEffect } from 'react';
import Header from './Header/Header';
import { Outlet, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/authSlice';

function Layout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('token');

  // whenever the user is found null + token is present that means react had rerendered and we rquire to fetch the logged in user using token

  useEffect(() => {
    if (token && !user) {
      dispatch(getUser());
    }
  }, [dispatch, token, user]);

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
