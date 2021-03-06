import React from 'react'
import LoginForm from './Loginform'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import * as ReactRedux from 'react-combine-reducers';
import { BrowserRouter } from 'react-router-dom'

describe("Loginform", () => {
  describe("with valid inputs", () => {
    it('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn()
      
      const {getByLabelText, getByRole} = render(<BrowserRouter><LoginForm onSubmit={mockOnSubmit}/></BrowserRouter>)



      await act(async () => {
        fireEvent.change(getByLabelText("Email *"), {target: {value: "gasparl@tlu.ee"}})
        fireEvent.change(getByLabelText("Password *"), {target: {value: "123456"}})
      })

      await act(async () => {
        fireEvent.click(getByRole("button"))
      })

      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })

  describe("with invalid email", () => {
    it("renders the email validation error", async () => {
      const {getByLabelText, container} = render(<LoginForm />)

      await act(async () => {
        const emailInput = getByLabelText("Email *")
        fireEvent.change(emailInput, {target: {value: "invalid email"}})
        fireEvent.blur(emailInput)
      })

      expect(container.innerHTML).toMatch("Enter a valid email")
    })
  })

  describe("with invalid password", () => {
    it("renders the password validation error", async () => {
      const {getByLabelText, container} = render(<LoginForm />)

      await act(async () => {
        const paswordInput = getByLabelText("Password *")
        fireEvent.change(paswordInput, {target: {value: "123"}})
        fireEvent.blur(paswordInput)
      })

      expect(container.innerHTML).toMatch("Password should be longer than 6 characters")

    })
  })
})