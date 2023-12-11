import { Counter } from "./Counter.js";

const cashPrize = 3_456_789;
// const cashPrize = 123;

new Counter()
.set_cash_prize(cashPrize)
.init();