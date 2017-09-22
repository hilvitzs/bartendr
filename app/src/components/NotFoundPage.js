import React from 'react';
import ErrorPage from '../containers/ErrorPage';

const NotFoundPage = () => <ErrorPage error={{ code: 404, statusText: "Not Found" }} />;

export default NotFoundPage;