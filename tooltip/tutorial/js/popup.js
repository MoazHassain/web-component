const template =document.createElement("template");
template.innerHTML = `

    <style>
        .tooltip-container 
        {
            z-index: 9;
            display: inline-block;
            position: relative;
            transition: 0.3s ease-in-out;
        }
        .cancel
        {
            display: none;

        }
        svg 
        {
            width: 18px;
            height: 18px;
        }
        svg path 
        {
            fill: rgb(25, 171, 255);
        }
        .notify-text
        {
            padding: 8px 15px;
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-size: 14px;
            position: absolute;
            bottom: 125%;
            white-space: nowrap;
            transform: scale(0);
            transform-origin: bottom left;
            background-color: #fff;
            transition: 0.5s cubic-bezier(0.64, 0, 0.78, 0);
            // background-color: rgb(251, 251, 0);
        }
        // .tooltip-container:hover .notify-text
        // /* .show */
        // {
        //     transform: scale(1);
        // }
    </style>

    <div class="tooltip-container">
        <svg class="alert" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2.8125C8.27988 2.8125 2.8125 8.27988 2.8125 15C2.8125 21.7201 8.27988 27.1875 15 27.1875C21.7201 27.1875 27.1875 21.7201 27.1875 15C27.1875 8.27988 21.7201 2.8125 15 2.8125ZM15 21.5572C14.7682 21.5572 14.5417 21.4885 14.3489 21.3597C14.1562 21.231 14.006 21.0479 13.9173 20.8338C13.8286 20.6197 13.8054 20.3841 13.8506 20.1567C13.8959 19.9294 14.0075 19.7206 14.1714 19.5567C14.3352 19.3928 14.5441 19.2812 14.7714 19.236C14.9987 19.1908 15.2343 19.214 15.4485 19.3027C15.6626 19.3914 15.8456 19.5416 15.9744 19.7343C16.1031 19.927 16.1719 20.1536 16.1719 20.3854C16.1719 20.6962 16.0484 20.9942 15.8286 21.214C15.6089 21.4338 15.3108 21.5572 15 21.5572ZM16.2727 9.77109L15.9363 16.9195C15.9363 17.1682 15.8376 17.4066 15.6617 17.5824C15.4859 17.7583 15.2475 17.857 14.9988 17.857C14.7502 17.857 14.5117 17.7583 14.3359 17.5824C14.1601 17.4066 14.0613 17.1682 14.0613 16.9195L13.725 9.77461V9.77168C13.7176 9.59996 13.7451 9.42852 13.8057 9.26769C13.8664 9.10686 13.9589 8.95996 14.0778 8.83584C14.1967 8.71173 14.3395 8.61296 14.4976 8.54548C14.6557 8.47801 14.8258 8.44322 14.9977 8.44322C15.1695 8.44322 15.3396 8.47801 15.4977 8.54548C15.6558 8.61296 15.7986 8.71173 15.9175 8.83584C16.0364 8.95996 16.129 9.10686 16.1896 9.26769C16.2502 9.42852 16.2777 9.59996 16.2703 9.77168L16.2727 9.77109Z" fill="black"/>
        </svg>
        <svg class="cancel" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.875 6.125C19 1.25 11 1.25 6.125 6.125C1.25 11 1.25 19 6.125 23.875C11 28.75 18.875 28.75 23.75 23.875C28.625 19 28.75 11 23.875 6.125V6.125ZM18.5 20.25L15 16.75L11.5 20.25L9.75 18.5L13.25 15L9.75 11.5L11.5 9.75L15 13.25L18.5 9.75L20.25 11.5L16.75 15L20.25 18.5L18.5 20.25V20.25Z" fill="black"/>
        </svg>

        <div class="notify-text">
            <slot name= "message" />
        </div>
    </div>

    

    `;



class popupNotify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector(".notify-text");
        const alert = this.shadowRoot.querySelector(".alert");
        const cancel = this.shadowRoot.querySelector(".cancel");

        if(expandState == true) {
            tooltip.style.transform = "scale(1)";
            alert.style.display = "none";
            cancel.style.display = "block";
            expandState = false;
        } else {
            tooltip.style.transform = "scale(0)";
            alert.style.display = "block";
            cancel.style.display = "none";
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".alert").addEventListener("click", () => {
            this.tooltip(true)
        })
        this.shadowRoot.querySelector(".cancel").addEventListener("click", () => {
            this.tooltip(false)
        })
        if(this.getAttribute("tool_bgcolor")){
            this.shadowRoot.querySelector(".notify-text").style.background = this.getAttribute("tool_bgcolor");
        }
        if(this.getAttribute("tool_font")){
            this.shadowRoot.querySelector(".notify-text").style.color = this.getAttribute("tool_font");
        }
    }
}


window.customElements.define("pop-up", popupNotify);