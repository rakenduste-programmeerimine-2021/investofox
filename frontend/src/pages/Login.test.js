import React from 'react'
import Login from './Login'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import * as ReactDOM from "react-dom"
import LoginForm from '../components/LoginForm'

describe("Loginform", () => {

  describe("Render LoginForm", () => {
    it("Renders Loginform", () => {
        render(<LoginForm />)
    });
  })
})