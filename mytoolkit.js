// File name: mytoolkit.js

import {SVG} from './svg.min.js';

var MyToolkit = (function() {
    var Button = function(){
        var draw = SVG().addTo('body').size('100%','100%')
        var text = draw.text("Button").font('family', 'Menlo')
        var rect = draw.rect(100,50).fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0}).radius(10).move(5,5)
        text.move(rect.x() + (rect.width()/2)-(text.length()/2), rect.y() + rect.height()/3)
        var clickEvent = null
        var stateEvent = null
        var defaultState = "idle"

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0})
            defaultState = "idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "pressed"
            transition()
        })
        rect.mouseup(function(event){
            this.fill('white').stroke({color: 'black', width: 2.0})
            if (defaultState == "pressed") {
                if (clickEvent != null) {
                    clickEvent(event)
                }
            }
            defaultState = "up"
            transition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent(defaultState)
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
            onclick: function(eventHandler) {
                clickEvent = eventHandler
            },
            src: function() {
                return rect
            },
            setId: function(id) {
                text.text(id)
                text.move(rect.x() + (rect.width()/2)-(text.length()/2), rect.y() + rect.height()/3)
                rect.attr("id", id)
            }
        }
    }

    var CheckBox = function() {
        var draw = SVG().addTo('body').size('100%','100%')
        var rect = draw.rect(20,20).fill('white').stroke({color: 'black', width: 2.0}).move(7.5,7.5)
        var check = draw.polyline('7.5,7.5 15,15 22.5,0').stroke({ color: 'blue', width: 3.0, linecap: 'round', linejoin: 'round' }).fill({opacity: 0}).hide()
        var text = draw.text("Check Box").font('family', 'Menlo').move(rect.width()*2, 7.5)
        var checkedEvent = null
        var stateEvent = null
        var defaultState = "idle"
        var checkedState = "unchecked"

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "pressed"
            transition()
        })
        rect.mouseup(function(event){
            if (defaultState == "pressed") {
                this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
                if (checkedState == "unchecked") {
                    checkedState = "checked"
                    check.show()
                    check.move(rect.x(),rect.y())
                } else {
                    checkedState = "unchecked"
                    check.hide()
                }
                if (checkedEvent != null) {
                    checkedEvent(checkedState)
                }
            }
            defaultState = "up"
            transition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent(defaultState)
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
            onclick: function(eventHandler) {
                checkedEvent = eventHandler
            },
            src: function() {
                return rect;
            },
            setId: function(id) {
                text.text(id)
                rect.attr("id", id)
            }
        }
    }

    var RadioButton = function(draw, i) {
        var num
        var innerCircle = draw.circle(15).fill({color: 'blue', opacity: 1.0}).move(7.5,7.5 + (35*i)).hide()
        var circle = draw.circle(20).fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0}).move(5,5 + (35*i))
        var text = draw.text("").font('family', 'Menlo').move(circle.width() * 2, 35*i)
        var checkedEvent = null
        var stateEvent = null
        var defaultState = "idle"
        var checkedState = null           

        circle.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            defaultState = "hover"
            transition()
        })
        circle.mouseout(function(){
            this.fill({color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0})
            defaultState = "idle"
            transition()
        })
        circle.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "pressed"
            transition()
        })
        circle.mouseup(function(event){
            if (defaultState == "pressed") {
                this.fill({ color: 'white', opacity: 0.1}).stroke({color: 'black', width: 2.0})
                checkedState = num
                innerCircle.show()
                
                if (checkedEvent != null) {
                    checkedEvent(checkedState)
                }
            }
            defaultState = "up"
            transition()
        })

        function transition()
        {
            if (stateEvent != null) {
                stateEvent(defaultState)
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
            onclick: function(eventHandler) {
                checkedEvent = eventHandler
            },
            clearBtn: function() {
                innerCircle.hide()
            },
            src: function() {
                return circle;
            },
            setId: function(id, n) {
                num = n
                text.text(id)
                circle.attr("id", id)
            }
        }
    }

    var RadioButtons = function() {
        var draw = SVG().addTo('body').size('100%','100%')
        var radioBtnList = new SVG.List([])

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
            onclick: function() {
                var i
                for (i = 0; i < radioBtnList.length; i++) {
                    radioBtnList[i].onclick(function(e) {
                        for (i = 0; i < radioBtnList.length; i++) {
                            if (i != e) {
                                radioBtnList[i].clearBtn();
                            }
                        }
                        console.log(e)
                    });
                }
            },
            src: function() {
                return circleList;
            },
            setButtons: function(labels) {
                if (labels.length < 2) {
                    throw 'number of radio button labels is less than 2'
                } else {
                    var i;
                    for (i = 0; i < labels.length; i++) {
                        var btn = new RadioButton(draw, i)
                        btn.setId(labels[i], i)
                        radioBtnList[i] = btn
                    }
                }
            }
        }
    }

    var TextBox = function() {
        var draw = SVG().addTo('body').size('100%','100%')
        var rect = draw.rect(250, 25).fill('white').stroke({color: 'black', width: 2.0}).move(7.5,7.5)
        var text = draw.text('hello').move(11.5, 11.5).font('family', 'Menlo')
        var caret = draw.line(65, 11, 65, 28).stroke({width: 2.0, color: "blue"}).hide()

        var textEvent = null
        var stateEvent = null
        var defaultState = "idle" 
        var defaultText = "Hello"

        rect.mouseover(function(){
            this.fill({ color: 'black', opacity: 0.1}).stroke({color: 'black', width: 3.0})
            caret.show()
            defaultState = "hover"
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            caret.hide()
            defaultState = "idle"
            transition()
        })
        rect.mousedown(function(){
            this.fill({ color: 'blue', opacity: 0.1}).stroke({color: 'blue', width: 3.0})
            defaultState = "pressed"
            transition()
        })
        rect.mouseup(function(){
            this.fill({ color: 'white'}).stroke({color: 'black', width: 2.0})
            defaultState = "up"
            transition()
        })
        function transition()
        {
            if (stateEvent != null) {
                stateEvent(defaultState)
            }
        }
        function textTransition()
        {
            if (textEvent != null) {
                textEvent(defaultText)
            }
        }
        return {
            move: function(x, y) {
                rect.move(rect.x() + x, rect.y() + y)
                text.move(text.x() + x, text.y() + y)
                caret.move(text.x()+text.length()+7.5, text.y(), text.x()+text.length()+7.5, text.y())
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
            type: function(sentence) {
                text.text(sentence)
                caret.move(text.x()+text.length()+7.5, text.y(), text.x()+text.length()+7.5, text.y())
                defaultText = "text changed: " + sentence;
                textTransition()
            }
        }
    }


return {Button, CheckBox, RadioButtons, TextBox}
}());

export{MyToolkit}