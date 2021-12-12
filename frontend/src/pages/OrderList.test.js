import React from "react";
import OrderList from "./OrderList";
import * as ReactDOM from "react-dom";
import {render, screen} from '@testing-library/react'

describe("OrderList", () => {
  describe("Render OrderList", () => {
    it("Renders the OrderList page", () => {
      const root = document.createElement("div");
      render(<OrderList />)
    });
});
})
