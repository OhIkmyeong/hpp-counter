import { Counter } from "./Counter.js";

// const cashPrize = 9_876_543;
const cashPrize = 0;

document.getElementsByName('cash-prize')[0].value = cashPrize;

new Counter()
.set_cash_prize(cashPrize)
.init();