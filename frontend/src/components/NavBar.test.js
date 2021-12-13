import React from 'react'
import NavBar from './NavBar'
import { getByTestId, getByText, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe("NavBar", () => {
  describe("Renders the Navbar component", () => {
    it("Renders the Navbar", () => {
        render(<BrowserRouter><NavBar /></BrowserRouter>)
    });

    it("Checks if buttons render", () => {
        const {getByTestId, getByText} = render(<BrowserRouter><NavBar /></BrowserRouter>)
        getByTestId("orders-test")
        getByTestId("stock-fetch-test")
        getByTestId("add-order-test")
        getByTestId("chart-test")
        getByTestId("settings-test")

    });
  })
})