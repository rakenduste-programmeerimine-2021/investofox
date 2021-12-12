import { STOCK_API, TOKEN } from './Utils/StockApi';
import axios from "axios"

//code from https://motion-software.com/blog/how-create-stock-portfolio-app-reactjs-firebase

//Function which fetches the current prices and updates our state with current prices and profit/loss
const stockFetcher = (stocks, setStocks, profitLossCalculator) => {
    stocks.forEach(async (stock) => {
        console.log(stock)
        try {
            const ticker = stock.ticker
            const response = await axios.get(`${STOCK_API}&symbol=${ticker}&apikey=${TOKEN}`)
            const data = await response.data;

            const today = new Date()
            const yesterday = new Date(today)
            
            yesterday.setDate(yesterday.getDate() - 1)

            console.log(yesterday)
            const currentPrice = data['Time Series (Daily)'][yesterday.toISOString().slice(0, 10)]['1. open']

            const profitLoss = profitLossCalculator(
                stock.price,
                currentPrice,
                stock.amount
            );

            const stockWithPrice = {
                ...stock,
                currentPrice: currentPrice,
                profitLoss,
            };

            const indexOfStock = stocks.indexOf(stock);
            setStocks((stocks) => [
                ...stocks.slice(0, indexOfStock),
                stockWithPrice,
                ...stocks.slice(indexOfStock + 1),
            ]);
        } catch (error) {
            /*The option how to handle the error is totally up to you. 
                Ideally, you can send notification to the user */
            console.log("error with stockFetcher: " + error);
        }
    });
};

export default stockFetcher;