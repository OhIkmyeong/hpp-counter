export class Counter{
    #cashPrize;

    constructor(){
        this.$counterWrap = null;
        this.$$numberWrap = null;
        this.$color = null;
        this.clssList = {
            numberWrap : "counter-number-wrap",
            numberList : "counter-number-list",
            numberItem : "counter-number-list-item", 
            target : 'number-target',
        }
    }//constructor

    set_cash_prize(cashPrize){
        this.#cashPrize = String(cashPrize) ?? 0;
        console.log(this.#cashPrize);
        return this;
    }//set_cash_prize

    init(){
        this.$counterWrap = document.getElementsByClassName('counter-wrap')[0];
        this.$$numberWrap = Array.from(this.$counterWrap.getElementsByClassName(this.clssList.numberWrap));
        this.$color = document.getElementsByName('counter-color')[0];

        /* DOM */
        this.fill_number_wrap();

        /* (FUNC) */
        this.animate_number_wrap();

        /* (EVENT) */
        this.$color.addEventListener('change', this.on_change_color);
    }//init
    
    fill_number_wrap(){
        const lenWrap = this.$$numberWrap.length;
        const lenNum = this.#cashPrize.length;
        let startIdx = lenWrap - lenNum;
        let targetNumIdx = 0;
        if(startIdx < 0){return console.error('액수가 너무 큼')}

        this.$$numberWrap.forEach(($numberWrap,idx) =>{
            /* list */
            const $list = document.createElement('UL');
            $list.classList.add(this.clssList.numberList);
            $numberWrap.appendChild($list);
            
            /* 반복횟수 */
            const iterCount = idx + 1;
            
            /* fill list */
            for(let i=0; i<iterCount; i++){
                for(let num=0; num<=9; num++){
                    const $item = document.createElement('LI');
                    $item.classList.add(this.clssList.numberItem);
                    $item.textContent = num;
                    $list.appendChild($item);

                    if(i !== iterCount - 1) continue;
                    if(startIdx !== idx) continue;
                    const answer = this.#cashPrize.at(targetNumIdx);
                    if(answer !== String(num)) continue;
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
    animate_number_wrap(){
        for(const $numberWrap of this.$$numberWrap){
            const $list = $numberWrap.getElementsByClassName(this.clssList.numberList)[0];
            const $target = $numberWrap.getElementsByClassName(this.clssList.target)[0];
            const top = $target.offsetTop * -1;
            $list.animate([
                {transform : `translateY(${top}px)`}
            ],{
                duration : 4000,
                fill : "both",
                easing : "cubic-bezier(0.34, 1.25, 0.7, 1)",
            });
        }//for
    }//animate_number_wrap

    on_change_color = e =>{
        const value = e.target.value;
        this.$counterWrap.style.setProperty('--counter-wrap-color', value);
    }//on_change_color
}//Counter