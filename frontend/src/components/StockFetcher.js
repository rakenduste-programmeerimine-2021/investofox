import { STOCK_API_GLOBAL, TOKEN } from './Utils/StockApi';
import axios from "axios"

//code from https://motion-software.com/blog/how-create-stock-portfolio-app-reactjs-firebase

//Function which fetches the current prices and updates our state with current prices and profit/loss
const stockFetcher = async(stocks, setStocks, profitLossCalculator) => {
    await stocks.forEach(async (stock) => {
        //console.log(stock)
        try {
            const ticker = stock.ticker
            const response = await axios.get(`${STOCK_API_GLOBAL}&symbol=${ticker}&apikey=${TOKEN}`)
            const returnedData = await response.data;
            //console.log(returnedData)

            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate())
            const time = yesterday.toISOString().slice(0, 17).replace("T", " ").concat("00")


            const currentPrice = returnedData['Global Quote']['05. price']

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

    return setStocks
};

export default stockFetcher;