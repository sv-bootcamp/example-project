
import React from 'react';
import { render } from 'react-dom';
import FacebookButton from './FacebookButton';

render(
   <FacebookButton fb={FB} />,
   document.getElementById('facebook-login'));