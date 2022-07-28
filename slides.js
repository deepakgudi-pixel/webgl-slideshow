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
const imageTag = document.querySelector("div.canvas-holder img");


let index = 0;

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
    imageTag.setAttribute("src", photos[index].src);
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