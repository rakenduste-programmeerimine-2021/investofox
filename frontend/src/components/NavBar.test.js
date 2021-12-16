import React from 'react'
import NavBar from './NavBar'
import { getByTestId, getByText, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Enzyme, {shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter()})

describe("NavBar", () => {
  describe("Renders the Navbar component", () => {
    it("Renders the Navbar", () => {
        render(<BrowserRouter><NavBar /></BrowserRouter>)
    });

    it("Checks if buttons render", () => {
        const {getByTestId} = render(<BrowserRouter><NavBar /></BrowserRouter>)
        getByTestId("orders-test")
        getByTestId("stock-fetch-test")
        getByTestId("add-order-test")
        getByTestId("chart-test")
        getByTestId("settings-test")
    });
  })

  describe('Test if button redirects', () => {
    it('Test click event', () => {

      const wrapper = shallow(<BrowserRouter><NavBar /></BrowserRouter>)
      const button = wrapper.find('settings-test').simulate('click')
      expect(button).toBe(1)
    });
  });
})