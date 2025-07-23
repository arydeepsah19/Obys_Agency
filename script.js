function locomotive()
{
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function loaderAnimation()
{
    var t1 = gsap.timeline();
    t1.from(".line h1",{
        y: 150,
        stagger : 0.25,
        duration: 0.5,
        delay: 0.5
    })
    t1.from("#line-part1, .line h2", {
        opacity: 0,
        onStart: ()=>{
            var h5text = document.querySelector("#line-part1 h5");
            var  inc=0;
            setInterval(()=> {
                if(inc<100)
                    h5text.innerHTML = inc++;
                else{
                    h5text.innerHTML = inc;
                }
            },33)
        }
    })
    t1.to(".line h2", {
        animationName: "anime",
        opacity: 1
    })
    t1.to("#loader",{
        opacity: 0,
        duration: 0.2,
        delay: 0
    })
    t1.from("#page1",{
        delay: 0.2,
        duration: 0.6,
        y: 1600,
        ease: Power4,
    })
    t1.to("#loader",{
        display: "none"
    })
    t1.from("#nav",{
        opacity: 0
    })
    t1.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero3 h3, #hero4 h1",{
        y: 140,
        stagger: 0.25,
    })
    t1.from("#video-container",{
        opacity: 0
    })
}
function cursorAnimation(){
    document.addEventListener("mousemove", (e)=>
    {
        gsap.to("#crsr", {
            left:e.x,
            top:e.y,
            ease: "power1.out"
        })
    })

    Shery.makeMagnet("#nav-part2 h4", {
        strength: 50,
        distance: 300
    });
    Shery.makeMagnet("#menu", {
        strength: 50,
        distance: 300
    });

    const videoContainer = document.querySelector("#video-container");
    const videoCursor = document.querySelector("#video-cursor");
    const crsr = document.querySelector("#crsr");

    let isInside = false;

    document.addEventListener("mousemove", (e) => {
        const bounds = videoContainer.getBoundingClientRect();
        
        // Check if mouse is inside video container
        if (e.clientX >= bounds.left && e.clientX <= bounds.right && e.clientY >= bounds.top && e.clientY <= bounds.bottom) 
        {
            if (!isInside) {
                isInside = true;
                gsap.to(crsr, { opacity: 0 });
            }

            gsap.to(videoCursor, {
                left: e.clientX - 460,
                y: e.clientY - 310
            });
        } else if (isInside) {
            // Mouse just left the container
            isInside = false;
            gsap.to(crsr, { opacity: 1 });
            gsap.to(videoCursor, {
                left: "67%",
                top: "-10%"
            });
        }
    });


    var video = document.querySelector("#video-container video");
    var flag = 0;
    videoContainer.addEventListener("click", ()=>{
        if(flag==0)
        {
            video.play();
            video.style.opacity= 1
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-fill"></i>`
            gsap.to("#video-cursor",{
                scale: 0.5
            })
            flag=1;
        }
        else{
            video.pause();
            video.style.opacity= 0
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-fill"></i>`
            gsap.to("#video-cursor",{
                scale: 1
            })
            flag=0;
        }
    })

}
function sheryAnimation()
{
    Shery.imageEffect(".image-div",{
        style: 4,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":"9996999","range":[-9999999,9999999]},"aspect":{"value":0.8050324823863116},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0.05,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.27,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey: true
    })
}

function flagAnimation()
{
    document.addEventListener("mousemove", (dets)=>{
        gsap.to("#flag",{
            x: dets.x,
            y: dets.y
        })
    })

    var web = document.querySelector("#hero3");
    web.addEventListener("mouseenter", ()=>{
        gsap.to("#flag", {
            opacity: 1,
        })
    })
    document.querySelector("#hero3").addEventListener("mouseleave", ()=>{
        gsap.to("#flag", {
            opacity: 0
        })
    })
}
loaderAnimation();
cursorAnimation();
locomotive();
sheryAnimation();
flagAnimation();