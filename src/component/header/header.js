import pic from '../../assets/c.jpg'
import photo from '../../assets/image.png'
import './style.scss'
const element = document.createElement("header");
element.innerHTML = "this is webpack demo";
document.body.appendChild(element);

const img = document.createElement("img");
img.src = pic;
document.body.appendChild(img);



