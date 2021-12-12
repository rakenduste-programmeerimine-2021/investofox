import React from 'react'
import LoginForm from './Loginform'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import * as ReactRedux from 'react-combine-reducers';

describe("Loginform", () => {
  describe("with valid inputs", () => {
    it('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn()

      beforeAll(() => {
        // tells useDispatch to return the mocked dispatch
        ReactRedux.useDispatch = jest.fn().mockImplementation(() => mockOnSubmit);
        // tells useSelector to return an empty array
        ReactRedux.useSelector = jest.fn().mockImplementation(() => []);
      });
      
      const {getByLabelText, getByRole} = render(<LoginForm onSubmit={mockOnSubmit}/>)



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