const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="../style/home.css">

    <style>
        .title h1
        {
            font-family: "rasa", sans-serif;
            font-size: 28px;
            font-weight: 700;
        }
        .text 
        {
            font-family: "hind", sans-serif;
            font-size: 16px;
        }
        .collection .btn
        {
            font-family: "hind", sans-serif;
            font-size: 15px;

        }
        
        
    </style>

    <div class="card">
        <div class="img">
            <img src="./img/card-img.jpg" alt="">

        </div>
        <div class="info">
            <div class="title">
                <h1 class=""><slot name="title" /></h1>
            </div>
            <div class="text">
                <slot name="block-text" />
            </div>
            <div class="collection">
                <div class="btn">Sweater</div>
                <div class="btn">Shirt</div>
                <div class="btn">T-shirt</div>
                <div class="btn">Jeans</div>
                <div class="btn">Suit</div>
                <div class="btn">Shoes</div>
                <div class="btn">Vest</div>

            </div>
            <a href="" class="btn">
                <button>SHOW MORE</button>
            </a>
        </div>
    </div>
`


class customCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    connectedCallBack() {
        // if(this.getAttribute("title_font")){
        //     this.shadowRoot.querySelector("")
        // }
    }


}

window.customElements.define("custom-card", customCard)

