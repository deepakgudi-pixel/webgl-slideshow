const photos = [
    {
        src: "images/image1.jpg",
        title: "1 / 6",
    },
    {
        src: "images/image2.jpg",
        title: "2 / 6",
    },
    {
        src: "images/image3.jpg",
        title: "3 / 6",
    },
    {
        src: "images/image4.jpg",
        title: "4 / 6",
    },
    {
        src: "images/image5.jpg",
        title: "5 / 6",
    },
    {
        src: "images/image6.jpg",
        title: "6 / 6",
    }
];

console.log(photos.length);

const prevTag = document.querySelector("nav a.prev");
const nextTag = document.querySelector("nav a.next");
const descriptionTag = document.querySelector("header div");
// const imageTag = document.querySelector("div.canvas-holder img");
const canvas = document.querySelector("div.canvas-holder canvas");
const sandbox = new GlslCanvas(canvas);
sandbox.load(frag);

let index = 0;

const sizer = function (){
   const ww = window.innerWidth;
   const wh = window.innerHeight;
   const s = Math.min(ww, wh);
   const dpi = window.devicePixelRatio;

   canvas.width =  s * 0.6 * dpi;
   canvas.height = s * 0.9 * dpi;
   canvas.style.width = Math.round(s * 0.6) + "px";
   canvas.style.height = Math.round(s * 0.9) + "px";

}




const next = () => {
    index = index + 1;

    if (index > photos.length - 1) {
      index = 0;
    }

    update();
}

const prev = () => {
    index = index - 1;
    
   if(index < 0) {
    index = photos.length - 1;
   }
    
    update();
}

const update = () => {
    descriptionTag.innerHTML = photos[index].title;
    // imageTag.setAttribute("src", photos[index].src);

}

//events

nextTag.addEventListener("click",(e) => {
     e.preventDefault();
     next();
})

prevTag.addEventListener("click", (e) => {
    e.preventDefault();
    prev();
})

window.addEventListener("resize", function(){
    sizer();
})