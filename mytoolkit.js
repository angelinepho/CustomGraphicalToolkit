// File name: mytoolkit.js

import {SVG} from './svg.min.js';

var MyToolkit = (function() {
    /**
     * Button
     * @constructor
     * @param {SVG()} w - The SVG window to put the button.
     * @param {string} label - The label for the button.
     */
    var Button = function(w, label){
        var draw = w
        var text = draw.text(label).font('family', 'Menlo')
        var rect = draw.rect(100,50).fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0}).radius(10).move(5,5)
        rect.size(text.length()+30, rect.height())
        text.move(rect.x() + (rect.width()/2)-(text.length()/2), rect.y() + rect.height()/3)
        
        var clickEvent = null
        var stateEvent = null
        var defaultClick = ""
        var defaultState = "Idle"

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "Hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0})
            defaultState = "Idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "Pressed"
            transition()
        })
        rect.mouseup(function(e){
            this.fill('white').stroke({color: 'black', width: 2.0})
            if (defaultState == "Pressed") {
                if (clickEvent != null) {
                    defaultClick = e
                }
            }
            defaultState = "Up"
            transition()
            clickTransition()

        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("Button Widget State: " + defaultState)
            }
        }
        function clickTransition()
        {
            if (clickEvent != null) {
                clickEvent("Button Clicked: " + defaultClick)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                text.move(text.x() + x, text.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            clickChanged: function(eventHandler) {
                clickEvent = eventHandler
            }
        }
    }

    /**
     * Check Box
     * @constructor
     * @param {SVG()} w - The SVG window to put the check box.
     * @param {string} label - The label for the check box.
     */
    var CheckBox = function(w, label) {
        var draw = w
        var rect = draw.rect(20,20).fill('white').stroke({color: 'black', width: 2.0}).move(7.5,7.5)
        var check = draw.polyline('7.5,7.5 15,15 22.5,0').stroke({ color: 'blue', width: 3.0, linecap: 'round', linejoin: 'round' }).fill({opacity: 0}).hide()
        var text = draw.text(label).font('family', 'Menlo').move(rect.width()*2, 7.5)
        
        var checkedEvent = null
        var stateEvent = null
        var defaultState = "Idle"
        var checkedState = "Unchecked"

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "Hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "Pressed"
            transition()
        })
        rect.mouseup(function(e){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            if (checkedState == "Unchecked") {
                checkedState = "Checked"
                check.show()
                check.move(rect.x(),rect.y())
            } else {
                checkedState = "Unchecked"
                check.hide()
            }
            defaultState = "Up"
            transition()
            checkTransition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("CheckBox Widget State: " + defaultState)
            }
        }
        function checkTransition()
        {
            if (checkedEvent != null) {
                checkedEvent("CheckBox Status: " + checkedState)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                check.move(check.x() + x, check.y() + y)
                text.move(text.x() + x, text.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            checkChanged: function(eventHandler) {
                checkedEvent = eventHandler
            }
        }
    }

    /**
     * Single Radio Button
     * @constructor
     * @param {SVG()} draw - The SVG window to put the radio button.
     * @param {string} label - The label for the radio button.
     * @param {int} i - Unique number for the radio button in a collection.
     */
    var RadioButton = function(draw, label, i) {
        var num = i
        var innerCircle = draw.circle(15).fill({color: 'blue', opacity: 1.0}).move(7.5,7.5 + (35*i)).hide()
        var circle = draw.circle(20).fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0}).move(5,5 + (35*i))
        var text = draw.text(label).font('family', 'Menlo').move(circle.width() * 2, circle.y())
        
        var checkedEvent = null
        var stateEvent = null
        var defaultState = "Idle"
        var checkedState = null           

        circle.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "Hover"
            transition()
        })
        circle.mouseout(function(){
            this.fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0})
            defaultState = "Idle"
            transition()
        })
        circle.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "Pressed"
            transition()
        })
        circle.mouseup(function(event){
            if (defaultState == "Pressed") {
                this.fill({ color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0})
                checkedState = num
                innerCircle.show()
            }
            defaultState = "Up"
            transition()
            checkTransition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("RadioButton(" + num + ") Widget State: " + defaultState)
            }
        }
        function checkTransition()
        {
            if (checkedEvent != null) {
                checkedEvent("RadioButton(" + checkedState + ") Status: Checked")
            }
        }
        return {
            move: function(x, y) {
                innerCircle.move(innerCircle.x() + x, innerCircle.y() + y)
                circle.move(circle.x() + x, circle.y() + y)
                text.move(text.x() + x, text.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            checkChanged: function(eventHandler) {
                checkedEvent = eventHandler
            },
            clearBtn: function() {
                innerCircle.hide()
            }
        }
    }

    /**
     * Collection of Radio Buttons
     * @constructor
     * @param {SVG()} w - The SVG window to put the radio buttons.
     * @param {string} labels - The labels for the radio buttons.
     */
    var RadioButtons = function(w, labels) {
        var draw = w
        var radioBtnList = new SVG.List([])
        var longest = 0

        if (labels.length < 2) {
            throw 'Number of Radio Buttons cannot be less than 2'
        } else {
            var i;
            for (i = 0; i < labels.length; i++) {
                var btn = new RadioButton(draw, labels[i], i)
                radioBtnList[i] = btn
                if (labels[i].length > longest) {
                    longest = labels[i].length
                }
            }
        }

        return {
            move: function(x, y) {
                var i
                for (i = 0; i < radioBtnList.length; i++) {
                    radioBtnList[i].move(x, y)
                }
            },
            stateChanged: function() {
                var i
                for (i = 0; i < radioBtnList.length; i++) {
                    radioBtnList[i].stateChanged(function(e) {
                        console.log(e)
                    });
                }
            },
            checkChanged: function() {
                var i
                for (i = 0; i < radioBtnList.length; i++) {
                    radioBtnList[i].checkChanged(function(e) {
                        for (i = 0; i < radioBtnList.length; i++) {
                            if ("RadioButton(" + i + ") Status: Checked" != e) {
                                radioBtnList[i].clearBtn();
                            }
                        }
                        console.log(e)
                    });
                }
            }
        }
    }

    /**
     * Text Box
     * @constructor
     * @param {SVG()} w - The SVG window to put the text box.
     */
    var TextBox = function(w) {
        var draw = w
        var rect = draw.rect(250, 25).fill('white').stroke({color: 'black', width: 2.0}).move(7.5,7.5)
        var text = draw.text('').move(11.5, 5).font('family', 'Menlo')
        var caret = draw.rect(2,17.5).move(text.length()+15, 11).fill('blue')
        
        var runner = caret.animate().width(0)
        runner.loop(1000, 1, 0)
        
        var textEvent = null
        var stateEvent = null
        var defaultState = "Idle" 
        var defaultText = ""

        SVG.on(window, 'keyup', (event) => {
            if (event.key != "Backspace" && event.key != "Enter" && event.key != "Meta" && event.key != "Alt" && event.key != "CapsLock" && 
            event.key != "Shift" && event.key != "Control" && event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != "ArrowUp"
            && event.key != "ArrowDown" && event.key != "Escape") {
                text.text(text.text() + event.key)
                caret.x(text.length() + 11.5)
            } else if (event.key == "Backspace") {
                var end = String(text.text()).length
                text.text(text.text().substring(0, end-1))
                caret.x(text.length() + 11.5)
            }
            if (caret.x() > rect.x() + rect.width()) {
                rect.size(text.length() + 70, rect.height())
            }
            defaultText = text.text();
            textTransition()
        })

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "Hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "Pressed"
            transition()
        })
        rect.mouseup(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Up"
            transition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("TextBox Widget State: " + defaultState)
            }
        }
        function textTransition()
        {
            if (textEvent != null) {
                textEvent("TextBox Text Change: " + defaultText)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                text.move(text.x() + x, text.y() + y)
                caret.move(caret.x() + x, caret.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            textChanged: function(eventHandler) {
                textEvent = eventHandler
            },
            src: function() {
                return rect;
            },
            getText: function() {
                return text.text()
            }
        }
    }

    /**
     * Scroll Bar
     * @constructor
     * @param {SVG()} w - The SVG window to put the scroll bar.
     * @param {int} height - The custom hieght for the scroll bar.
     */
    var ScrollBar = function(w, height) {
        var draw = w
        var rect = draw.rect(20, height).fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0}).radius(5).move(7.5,7.5)
        var btn = draw.rect(20,50).fill('black').radius(5)
        btn.move(rect.x(), rect.y())
        
        var scrollEvent = null
        var stateEvent = null
        var defaultState = "Idle" 
        var scrollDefault = ""

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "Hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Idle"
            transition()
        })
        rect.mousedown(function(e){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "Pressed"
            if (e.y <= rect.y()+25) {
                btn.animate(10, 'elastic').move(rect.x(), rect.y())
                scrollDefault = "Up movement"
            } else if (e.y >= rect.y()+rect.height()-25) {
                btn.animate(10, 'elastic').move(rect.x(), rect.y()+rect.height()-50)
                scrollDefault = "Down movement"
            } else {
                if (e.y-150 > btn.y()+25) {
                    btn.animate(10, 'elastic').move(btn.x(),e.y)
                    scrollDefault = "Down movement"
                } else {
                    btn.animate(10, 'elastic').move(btn.x(),e.y)
                    scrollDefault = "Up movement"
                }
            }
            transition()
        })
        rect.mouseup(function(e){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Up"
            if (e.y <= rect.y()+25) {
                btn.animate(10, 'elastic').move(rect.x(), rect.y())
                scrollDefault = "Up movement"
            } else if (e.y >= rect.y()+rect.height()-25) {
                btn.animate(10, 'elastic').move(rect.x(), rect.y()+rect.height()-50)
                scrollDefault = "Down movement"
            } else {
                if (e.y > btn.y()+25) {
                    btn.animate(10, 'elastic').move(btn.x(),e.y)
                    scrollDefault = "Down movement"
                } else {
                    btn.animate(10, 'elastic').move(btn.x(),e.y)
                    scrollDefault = "Up movement"
                }
            }
            transition()
            scrollTransition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("ScrollBar Widget State: " + defaultState)
            }
        }
        function scrollTransition()
        {
            if (scrollEvent != null) {
                scrollEvent("ScrollBar Scroll: " + scrollDefault)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                btn.move(btn.x() + x, btn.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            scrollChanged: function(eventHandler) {
                scrollEvent = eventHandler
            }
        }
    }

    /**
     * Progress Bar
     * @constructor
     * @param {SVG()} w - The SVG window to put the progress bar.
     * @param {int} width - The custom width for the progress bar.
     * @param {int} increment - The initial increment for the progress bar.
     */
    var ProgressBar = function(w, width, increment){
        var increment = increment
        var draw = w
        var rect = draw.rect(width, 20).fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0}).radius(5).move(7.5,7.5)
        var prog = draw.rect(rect.width()*increment*0.01, 20).fill('green').radius(5).move(rect.x(), rect.y())
        
        var incrementEvent = null
        var stateEvent = null
        var defaultState = "Idle" 
        var defaultIncrement = String(increment) + "%"

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "Hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Idle"
            transition()
        })
        rect.mousedown(function(e){
            this.fill({ color: 'green', opacity: 0.1}).stroke({color: 'green', width: 3.0})
            defaultState = "Pressed"
            transition()
        })
        rect.mouseup(function(e){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "Up"
            transition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("ProgressBar Widget State: " + defaultState)
            }
        }
        function incrementTransition()
        {
            if (incrementEvent != null) {
                incrementEvent("ProgessBar Incremented to: " + defaultIncrement)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                prog.move(prog.x() + x, prog.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            incrementChanged: function(eventHandler) {
                incrementEvent = eventHandler
            },
            getIncrement: function() {
                return increment
            },
            increment: function(v) {
                if (v <= 100 && v >= 0) {
                    increment = v
                    prog.size(rect.width()*v*0.01, prog.height())
                    defaultIncrement = String(v) + "%"
                    incrementTransition()
                } else {
                    throw('value not between 0-100')
                }
            }
        }
    }

    /**
     * Toggle Button
     * @constructor
     * @param {SVG()} w - The SVG window to put the toggle button.
     */
    var ToggleButton = function(w) {
        var draw = w
        var btn = draw.rect(25, 25).fill('red').radius(5)
        var rect = draw.rect(50, 25).fill({color: 'white', opacity: 0.1}).stroke({color: 'red', width: 2.0}).radius(5).move(7.5,7.5)
        btn.move(rect.x(), rect.y())
        
        var toggleEvent = null
        var stateEvent = null
        var defaultState = "Idle" 
        var defaultToggle = "Off"

        rect.mouseover(function(){
            this.fill({color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            btn.fill('black')
            defaultState = "Hover"
            transition()
        })
        rect.mouseout(function(){
            if (defaultToggle == "Off") {
                this.fill({color: 'white', opacity: 0.1}).stroke({color: 'red', width: 2.0}).radius(5)
                btn.fill('red')
            } else {
                this.fill({color: 'white', opacity: 0.1}).stroke({color: 'green', width: 2.0}).radius(5)
                btn.fill('green')
            }
            defaultState = "Idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            btn.fill('blue')
            defaultState = "Pressed"
            transition()
        })
        rect.mouseup(function(){
            if (defaultToggle == "Off") {
                this.fill({color: 'white', opacity: 0.1}).stroke({color: 'green', width: 2.0}).radius(5)
                btn.fill('green').move(rect.x()+rect.width()/2, btn.y())
                defaultToggle = "On"
            } else {
                this.fill({color: 'white', opacity: 0.1}).stroke({color: 'red', width: 2.0}).radius(5)
                btn.fill('red').move(rect.x(), btn.y())
                defaultToggle = "Off"
            }
            defaultState = "Up"
            transition()
            toggleTransition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent("Toggle Widget State: " + defaultState)
            }
        }
        function toggleTransition()
        {
            if (toggleEvent != null) {
                toggleEvent("Toggle Status: " + defaultToggle)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                btn.move(btn.x() + x, btn.y() + y)
            },
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler
            },
            toggleChanged: function(eventHandler) {
                toggleEvent = eventHandler
            }
        }
    }

return {Button, CheckBox, RadioButtons, TextBox, ScrollBar, ProgressBar, ToggleButton}
}());

export{MyToolkit}