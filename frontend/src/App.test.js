import React from 'react'
import App from './App'
import { render } from '@testing-library/react'

describe("App", () => {

  describe("Render the App component", () => {
    it("Renders App", () => {
        render(<App />)
    });
  })
})