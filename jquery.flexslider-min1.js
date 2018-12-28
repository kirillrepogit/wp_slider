/*
 * jquery flexslider v1.7
 * http://flex.madebymufffin.com
 * copyright 2011, tyler smith
 * free to use under the mit license.
 */
(function (a) {
    a.flexslider = function (c, b) {
        var d = c;
        d.init = function () {
            d.vars = a.extend({}, a.flexslider.defaults, b);
            d.data("flexslider", true);
            d.container = a(".slides", d);
            d.slides = a(".slides > li", d);
            d.count = d.slides.length;
            d.animating = false;
            d.currentslide = d.vars.slidetostart;
            d.atend = (d.currentslide == 0) ? true : false;
            d.eventtype = ("ontouchstart" in document.documentelement) ? "touchstart" : "click";
            d.clonecount = 0;
            d.cloneoffset = 0;
            if (d.vars.controlscontainer != "") {
                d.controlscontainer = a(d.vars.controlscontainer).eq(a(".slides").index(d.container));
                d.containerexists = d.controlscontainer.length > 0
            }
            if (d.vars.manualcontrols != "") {
                d.manualcontrols = a(d.vars.manualcontrols, ((d.containerexists) ? d.controlscontainer : d));
                d.manualexists = d.manualcontrols.length > 0
            }
            if (d.vars.randomize) {
                d.slides.sort(function () {
                    return (math.round(math.random()) - 0.5)
                });
                d.container.empty().append(d.slides)
            }
            if (d.vars.animation.tolowercase() == "slide") {
                d.css({overflow: "hidden"});
                if (d.vars.animationloop) {
                    d.clonecount = 2;
                    d.cloneoffset = 1;
                    d.container.append(d.slides.filter(":first").clone().addclass("clone")).prepend(d.slides.filter(":last").clone().addclass("clone"))
                }
                d.container.width(((d.count + d.clonecount) * d.width()) + 2000);
                d.newslides = a(".slides > li", d);
                settimeout(function () {
                    d.newslides.width(d.width()).css({"float": "left"}).show()
                }, 100);
                d.container.css({marginleft: (-1 * (d.currentslide + d.cloneoffset)) * d.width() + "px"})
            } else {
                d.slides.css({
                    width: "100%",
                    "float": "left",
                    marginright: "-100%"
                }).filter(":first").fadein(400, function () {
                })
            }
            if (d.vars.controlnav) {
                if (d.manualexists) {
                    d.controlnav = d.manualcontrols
                } else {
                    var g = a('<ol class="flex-control-nav"></ol>');
                    var k = 1;
                    for (var l = 0; l < d.count; l++) {
                        g.append("<li><a>" + k + "</a></li>");
                        k++
                    }
                    if (d.containerexists) {
                        a(d.controlscontainer).append(g);
                        d.controlnav = a(".flex-control-nav li a", d.controlscontainer)
                    } else {
                        d.append(g);
                        d.controlnav = a(".flex-control-nav li a", d)
                    }
                }
                d.controlnav.eq(d.currentslide).addclass("active");
                d.controlnav.bind(d.eventtype, function (i) {
                    i.preventdefault();
                    if (!a(this).hasclass("active")) {
                        d.flexanimate(d.controlnav.index(a(this)), d.vars.pauseonaction)
                    }
                })
            }
            if (d.vars.directionnav) {
                var f = a('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + d.vars.prevtext + '</a></li><li><a class="next" href="#">' + d.vars.nexttext + "</a></li></ul>");
                if (d.containerexists) {
                    a(d.controlscontainer).append(f);
                    d.directionnav = a(".flex-direction-nav li a", d.controlscontainer)
                } else {
                    d.append(f);
                    d.directionnav = a(".flex-direction-nav li a", d)
                }
                if (!d.vars.animationloop) {
                    if (d.currentslide == 0) {
                        d.directionnav.filter(".prev").addclass("disabled")
                    } else {
                        if (d.currentslide == d.count - 1) {
                            d.directionnav.filter(".next").addclass("disabled")
                        }
                    }
                }
                d.directionnav.bind(d.eventtype, function (i) {
                    i.preventdefault();
                    var j = (a(this).hasclass("next")) ? d.gettarget("next") : d.gettarget("prev");
                    if (d.canadvance(j)) {
                        d.flexanimate(j, d.vars.pauseonaction)
                    }
                })
            }
            if (d.vars.keyboardnav && a("ul.slides").length == 1) {
                a(document).keyup(function (i) {
                    if (d.animating) {
                        return
                    } else {
                        if (i.keycode != 39 && i.keycode != 37) {
                            return
                        } else {
                            if (i.keycode == 39) {
                                var j = d.gettarget("next")
                            } else {
                                if (i.keycode == 37) {
                                    var j = d.gettarget("prev")
                                }
                            }
                            if (d.canadvance(j)) {
                                d.flexanimate(j, d.vars.pauseonaction)
                            }
                        }
                    }
                })
            }
            if (d.vars.slideshow) {
                if (d.vars.pauseonhover && d.vars.slideshow) {
                    d.hover(function () {
                        d.pause()
                    }, function () {
                        d.resume()
                    })
                }
                d.animatedslides = setinterval(d.animateslides, d.vars.slideshowspeed)
            }
            if (d.vars.pauseplay) {
                var e = a('<div class="flex-pauseplay"><span></span></div>');
                if (d.containerexists) {
                    d.controlscontainer.append(e);
                    d.pauseplay = a(".flex-pauseplay span", d.controlscontainer)
                } else {
                    d.append(e);
                    d.pauseplay = a(".flex-pauseplay li a", d)
                }
                var h = (d.vars.slideshow) ? "pause" : "play";
                d.pauseplay.addclass(h).text(h);
                d.pauseplay.click(function (i) {
                    i.preventdefault();
                    (a(this).hasclass("pause")) ? d.pause() : d.resume()
                })
            }
            if (d.vars.touchswipe && "ontouchstart" in document.documentelement) {
                d.each(function () {
                    var i, j = 20;
                    ismoving = false;

                    function o() {
                        this.removeeventlistener("touchmove", m);
                        i = null;
                        ismoving = false
                    }

                    function m(s) {
                        if (ismoving) {
                            var p = s.touches[0].pagex, q = i - p;
                            if (math.abs(q) >= j) {
                                o();
                                var r = (q > 0) ? d.gettarget("next") : d.gettarget("prev");
                                if (d.canadvance(r)) {
                                    d.flexanimate(r, d.vars.pauseonaction)
                                }
                            }
                        }
                    }

                    function n(p) {
                        if (p.touches.length == 1) {
                            i = p.touches[0].pagex;
                            ismoving = true;
                            this.addeventlistener("touchmove", m, false)
                        }
                    }

                    if ("ontouchstart" in document.documentelement) {
                        this.addeventlistener("touchstart", n, false)
                    }
                })
            }
            if (d.vars.animation.tolowercase() == "slide") {
                d.slidertimer;
                a(window).resize(function () {
                    d.newslides.width(d.width());
                    d.container.width(((d.count + d.clonecount) * d.width()) + 2000);
                    cleartimeout(d.slidertimer);
                    d.slidertimer = settimeout(function () {
                        d.flexanimate(d.currentslide)
                    }, 300)
                })
            }
            d.vars.start(d)
        };
        d.flexanimate = function (f, e) {
            if (!d.animating) {
                d.animating = true;
                if (e) {
                    d.pause()
                }
                if (d.vars.controlnav) {
                    d.controlnav.removeclass("active").eq(f).addclass("active")
                }
                d.atend = (f == 0 || f == d.count - 1) ? true : false;
                if (!d.vars.animationloop) {
                    if (f == 0) {
                        d.directionnav.removeclass("disabled").filter(".prev").addclass("disabled")
                    } else {
                        if (f == d.count - 1) {
                            d.directionnav.removeclass("disabled").filter(".next").addclass("disabled");
                            d.pause();
                            d.vars.end(d)
                        } else {
                            d.directionnav.removeclass("disabled")
                        }
                    }
                }
                d.vars.before(d);
                if (d.vars.animation.tolowercase() == "slide") {
                    if (d.currentslide == 0 && f == d.count - 1 && d.vars.animationloop) {
                        d.slidestring = "0px"
                    } else {
                        if (d.currentslide == d.count - 1 && f == 0 && d.vars.animationloop) {
                            d.slidestring = (-1 * (d.count + 1)) * d.slides.filter(":first").width() + "px"
                        } else {
                            d.slidestring = (-1 * (f + d.cloneoffset)) * d.slides.filter(":first").width() + "px"
                        }
                    }
                    d.container.animate({marginleft: d.slidestring}, d.vars.animationduration, function () {
                        if (d.currentslide == 0 && f == d.count - 1 && d.vars.animationloop) {
                            d.container.css({marginleft: (-1 * d.count) * d.slides.filter(":first").width() + "px"})
                        } else {
                            if (d.currentslide == d.count - 1 && f == 0 && d.vars.animationloop) {
                                d.container.css({marginleft: -1 * d.slides.filter(":first").width() + "px"})
                            }
                        }
                        d.animating = false;
                        d.currentslide = f;
                        d.vars.after(d)
                    })
                } else {
                    d.slides.eq(d.currentslide).fadeout(d.vars.animationduration);
                    d.slides.eq(f).fadein(d.vars.animationduration, function () {
                        d.animating = false;
                        d.currentslide = f;
                        d.vars.after(d)
                    })
                }
            }
        };
        d.animateslides = function () {
            if (!d.animating) {
                var e = (d.currentslide == d.count - 1) ? 0 : d.currentslide + 1;
                d.flexanimate(e)
            }
        };
        d.pause = function () {
            clearinterval(d.animatedslides);
            if (d.vars.pauseplay) {
                d.pauseplay.removeclass("pause").addclass("play").text("play")
            }
        };
        d.resume = function () {
            d.animatedslides = setinterval(d.animateslides, d.vars.slideshowspeed);
            if (d.vars.pauseplay) {
                d.pauseplay.removeclass("play").addclass("pause").text("pause")
            }
        };
        d.canadvance = function (e) {
            if (!d.vars.animationloop && d.atend) {
                if (d.currentslide == 0 && e == d.count - 1 && d.direction != "next") {
                    return false
                } else {
                    if (d.currentslide == d.count - 1 && e == 0 && d.direction == "next") {
                        return false
                    } else {
                        return true
                    }
                }
            } else {
                return true
            }
        };
        d.gettarget = function (e) {
            d.direction = e;
            if (e == "next") {
                return (d.currentslide == d.count - 1) ? 0 : d.currentslide + 1
            } else {
                return (d.currentslide == 0) ? d.count - 1 : d.currentslide - 1
            }
        };
        d.init()
    };
    a.flexslider.defaults = {
        animation: "fade",
        slideshow: true,
        slideshowspeed: 7000,
        animationduration: 600,
        directionnav: true,
        controlnav: true,
        keyboardnav: true,
        touchswipe: true,
        prevtext: "previous",
        nexttext: "next",
        pauseplay: false,
        randomize: false,
        slidetostart: 0,
        animationloop: true,
        pauseonaction: true,
        pauseonhover: false,
        controlscontainer: "",
        manualcontrols: "",
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        }
    };
    a.fn.flexslider = function (b) {
        return this.each(function () {
            if (a(this).find(".slides li").length == 1) {
                a(this).find(".slides li").fadein(400)
            } else {
                if (a(this).data("flexslider") != true) {
                    new a.flexslider(a(this), b)
                }
            }
        })
    }
})(jquery);