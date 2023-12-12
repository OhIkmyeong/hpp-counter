export class Counter {
    #cashPrize;

    constructor() {
        this.$counterWrap = null;
        this.$$numberWrap = null;
        this.$form = null;
        this.clssList = {
            numberWrap: "counter-number-wrap",
            numberList: "counter-number-list",
            numberItem: "counter-number-list-item",
            target: 'number-target',
        }
    }//constructor

    set_cash_prize(cashPrize) {
        this.#cashPrize = String(cashPrize) ?? 0;
        console.log("this.#cashPrize",this.#cashPrize, typeof this.#cashPrize);
        return this;
    }//set_cash_prize

    init() {
        /* DOM */
        this.$counterWrap = document.getElementsByClassName('counter-wrap')[0];
        this.$$numberWrap = Array.from(this.$counterWrap.getElementsByClassName(this.clssList.numberWrap));
        this.$form = document.getElementById('frm');

        /* DOM + animation */
        this.restart();

        /* (EVENT) */
        this.$form.addEventListener('submit', this.on_submit_form);
    }//init

    restart() {
        /* DOM */
        this.fill_number_wrap();

        /* (FUNC) */
        this.animate_number_wrap();
    }//restart

    fill_number_wrap() {
        const lenWrap = this.$$numberWrap.length;
        const lenNum = this.#cashPrize.length;
        let startIdx = lenWrap - lenNum;
        let targetNumIdx = 0;
        if (startIdx < 0) { return console.error('액수가 너무 큼') }

        this.$$numberWrap.forEach(($numberWrap, idx) => {
            /* reset */
            $numberWrap.innerHTML = "";

            /* list */
            const $list = document.createElement('UL');
            $list.classList.add(this.clssList.numberList);
            $numberWrap.appendChild($list);

            /* 반복횟수 */
            const iterCount = idx + 1;

            /* fill list */
            for (let i = 0; i < iterCount; i++) {
                for (let num = 0; num <= 9; num++) {
                    const $item = document.createElement('LI');
                    $item.classList.add(this.clssList.numberItem);
                    $item.textContent = num;
                    $list.appendChild($item);

                    if (i !== iterCount - 1) continue;
                    if (startIdx !== idx) continue;
                    const answer = this.#cashPrize.at(targetNumIdx);
                    if (answer !== String(num)) continue;
                    $item.classList.add(this.clssList.target);
                    startIdx++;
                    targetNumIdx++;
                }//for-num
            }//for-iterCount
        });//forEach
    };

    /**
     * @url https://easings.net/ko#easeOutBack
     */
    animate_number_wrap() {
        const len = this.$$numberWrap.length;
        
        for (let i = 0; i < len; i++) {
            const $numberWrap = this.$$numberWrap[i];
            const $list = $numberWrap.getElementsByClassName(this.clssList.numberList)[0];
            const $target = $numberWrap.getElementsByClassName(this.clssList.target)[0];
            if(!$target){continue;}
            const top = $target.offsetTop * -1;
            $list.animate([
                { transform: `translateY(${top}px)` }
            ], {
                duration: 4000,
                fill: "both",
                easing: "cubic-bezier(0.34, 1.25, 0.7, 1)",
                delay : (len - i) * 100
            });
        }//for
    }//animate_number_wrap

    /**
     * form 제출시
     * @param {Event} e 
     */
    on_submit_form = e => {
        e.preventDefault();
        const valueColor = e.currentTarget.querySelector("[name='counter-color']").value;
        const cashPrize =  e.currentTarget.querySelector("[name='cash-prize']").value;
        
        this.$counterWrap.style.setProperty('--counter-wrap-color', valueColor);
        if(String(cashPrize) === this.#cashPrize) return;
        this.set_cash_prize(cashPrize);
        this.restart();
    }//on_submit_form
}//Counter