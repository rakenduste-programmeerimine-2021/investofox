import React from 'react'
import { render } from '@testing-library/react'
import LoginForm from '../components/LoginForm'
import { BrowserRouter } from 'react-router-dom'
import Store from "../store";

describe("Loginform", () => {

  describe("Render LoginForm", () => {
    it("Renders Loginform", () => {
        <Store>render(<BrowserRouter><LoginForm /></BrowserRouter>)</Store>
    });
  })
})