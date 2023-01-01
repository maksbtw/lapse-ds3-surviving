import {presets} from "./presets.js"

let gameOptions = {
    step: '1',
}

const $blocker = document.querySelector('.blocker')
const $index1 = document.querySelector('.index1 .status-bar div')
const $index2 = document.querySelector('.index2 .status-bar div')
const $index3 = document.querySelector('.index3 .status-bar div')
const $card = document.querySelector('.card')
const $desc = document.querySelector('.card .desc')
const $img = document.querySelector('.card .image')
const $actL = document.querySelector('main .action-left')
const $actR = document.querySelector('main .action-right')
const $person = document.querySelector('nav .person')

class Indexes {
    constructor(index1, index2, index3) {
        this.indexes = [index1, index2, index3]
    }

    change(array, side) {
        if(this.indexes[0] + array[0] <= 10 && this.indexes[0] + array[0] >= 0){
            this.indexes[0] = this.indexes[0] + array[0]
        }
        else if(this.indexes[0] + array[0] < 0) {
            this.indexes[0] = 0
        }
        else if(this.indexes[0] + array[0] > 10) {
            this.indexes[0] = 10
        }

        if(this.indexes[1] + array[1] <= 10 && this.indexes[1] + array[1] >= 0){
            this.indexes[1] = this.indexes[1] + array[1]
        }
        else if(this.indexes[1] + array[1] < 0) {
            this.indexes[1] = 0
        }
        else if(this.indexes[1] + array[1] > 10) {
            this.indexes[1] = 10
        }

        if(this.indexes[2] + array[2] <= 10 && this.indexes[2] + array[2] >= 0){
            this.indexes[2] = this.indexes[2] + array[2]
        }
        else if(this.indexes[2] + array[2] < 0) {
            this.indexes[2] = 0
        }
        else if(this.indexes[2] + array[2] > 10) {
            this.indexes[2] = 10
        }

        $index1.style.bottom = -(10 - this.indexes[0]) * 10 + '%'
        $index2.style.bottom = -(10 - this.indexes[1]) * 10 + '%'
        $index3.style.bottom = -(10 - this.indexes[2]) * 10 + '%'

        if(gameOptions.step.length < presets[presets.length-1].code.length){
            if(side === 'left'){
                gameOptions.step += '1'
            }
            else if(side === 'right'){
                gameOptions.step += '2'
            }

            $card.classList.add('card-changing')
            $actL.classList.add('action-left-changing')
            $actR.classList.add('action-right-changing')
            $blocker.classList.add('blocker-on')
            setTimeout(() => {
                displayStep(gameOptions.step)
            }, 750)
            setTimeout(() => {
                $card.classList.remove('card-changing')
                $actL.classList.remove('action-left-changing')
                $actR.classList.remove('action-right-changing')
                $blocker.classList.remove('blocker-on')
            }, 1500)
        }
        else {
        }
    }
}

let indexes = new Indexes(5, 5, 5)

function displayStep() {
    let preset
    presets.forEach((item) => {
        if(item.code === gameOptions.step){
            preset = item
        }
        else{
        }
    })


    $desc.innerText = preset.desc
    $card.style.background = preset.cardBg
    $img.src = preset.image
    $actL.innerText = preset.actionLeft
    $actL.addEventListener('mouseenter', () => {
        defineDifference(preset.effectLeft, true)
    })
    $actL.addEventListener('mouseleave', () => {
        defineDifference(preset.effectLeft, false)
    })
    $actR.innerText = preset.actionRight
    $actR.addEventListener('mouseenter', () => {
        defineDifference(preset.effectRight, true)
    })
    $actR.addEventListener('mouseleave', () => {
        defineDifference(preset.effectRight, false)
    })
    $person.innerText = preset.person

    $actL.onclick = () => {
        indexes.change(preset.effectLeft, 'left')
    }
    $actR.onclick = () => {
        indexes.change(preset.effectRight, 'right')
    }
}
displayStep(gameOptions.step)

function defineDifference(effect, show) {
    if(show){
        switch(Math.abs(effect[0])){
            case 0:
                document.querySelector('.line1').style.width = 5 + 'px'
                break
            case 1:
                document.querySelector('.line1').style.width = 25 + 'px'
                break
            case 2:
                document.querySelector('.line1').style.width = 50 + 'px'
                break
        }
        switch(Math.abs(effect[1])){
            case 0:
                document.querySelector('.line2').style.width = 5 + 'px'
                break
            case 1:
                document.querySelector('.line2').style.width = 25 + 'px'
                break
            case 2:
                document.querySelector('.line2').style.width = 50 + 'px'
                break
        }
        switch(Math.abs(effect[2])){
            case 0:
                document.querySelector('.line3').style.width = 5 + 'px'
                break
            case 1:
                document.querySelector('.line3').style.width = 25 + 'px'
                break
            case 2:
                document.querySelector('.line3').style.width = 50 + 'px'
                break
        }
    }
    else{
        document.querySelector('.line1').style.width = 0 + 'px'
        document.querySelector('.line2').style.width = 0 + 'px'
        document.querySelector('.line3').style.width = 0 + 'px'
    }
}

let helpWindowState = 0
document.querySelector('.help').onclick = () => {
    if(!helpWindowState){
        document.querySelector('.help-window').style.top = '0'
        helpWindowState = !helpWindowState
    }
    else {
        document.querySelector('.help-window').style.top = '-100%'
        helpWindowState = !helpWindowState
    }
}