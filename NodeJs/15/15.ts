class ElemBuilder {
    private currentElement: HTMLElement;
    public subBuilder: ElemBuilder;
    public style: CSSStyleDeclaration;

    public get element() {
        return this.currentElement;
    }

    public get height() {
        return this.style.height
    }
    public get width() {
        return this.style.width
    }

    constructor(element: HTMLElement = null) {
        this.currentElement = element !== null ? element : document.body;
        this.style = this.currentElement.style;
    }

    appendNewElement(tag: string) {
        this.appendElement(this.createSubElement(tag));
        return this.subBuilder;
    }

    appendElement(elem: HTMLElement) {
        this.subBuilder = new ElemBuilder(elem);
        this.currentElement.appendChild(elem);
        return this.subBuilder;
    }
    prependNewElement(tag: string) {
        this.prependElement(this.createSubElement(tag));
        return this.subBuilder;
    }

    prependElement(elem: HTMLElement) {
        this.subBuilder = new ElemBuilder(elem);
        this.currentElement.prepend(elem);
        return this.subBuilder;
    }

    append(elem: string | Node) {
        this.currentElement.append(elem);
        return this;
    }

    setBorder() {
        this.style.border = "1px solid black";
        return this;
    }

    setHeight(newHeight: string) {
        this.style.height = newHeight;
        return this;
    }

    setWidth(newWidth: string) {
        this.style.width = newWidth;
        return this;
    }

    setStyle(property: string, value: string | null, priority?: string) {
        this.style.setProperty(property, value, priority);
        return this;
    }

    addClass(className: string) {
        this.currentElement.classList.add(className);
        return this;
    }

    appendElemSize() {
        this.appendNewElement('p').append("Cell size " + this.width + "*" + this.height);
        return this;
    }

    setEmpty() {
        return this.addClass("empty")
            .setStyle('color', 'black')
            .setStyle('background-color', 'white')
            .appendNewElement('p')
            .append('empty cell size 900px*30px');
    }

    private createSubElement(tag: string) {
        let elem = document.createElement(tag);
        this.addEvents(elem);
        this.subBuilder = new ElemBuilder(elem);
        return elem;
    }

    private addEvents(elem: HTMLElement) {
        switch (elem.tagName) {
            case 'P':
                elem.onmouseenter = function (event) {
                    switchColor(event.target as HTMLElement);
                };
                elem.onmouseleave = function (event) {
                    switchColor(event.target as HTMLElement);
                };
                break;
            case 'DIV':
                elem.onclick = function (event) {
                    switchPreviousSibling(event.currentTarget as HTMLElement)
                }
                elem.ondblclick = function (event) {
                    switchNextSibling(event.currentTarget as HTMLElement)
                }
                break;
            default:
        }
    }
}
function switchPreviousSibling(element: HTMLElement) {
    let sibling = element.previousElementSibling.previousElementSibling as HTMLElement;
    if (sibling === null)
        sibling = element.parentElement.lastElementChild as HTMLElement
    switchSibling(element, sibling);
}
function switchNextSibling(element) {
    var sibling = element.nextElementSibling?.nextElementSibling;
    if (sibling === null || sibling === undefined)
        sibling = element.parentElement.firstElementChild.nextElementSibling;
    switchSibling(element, sibling);
}
function switchSibling(element: HTMLElement, sibling: HTMLElement) {
    let children = element.children;
    let sibChildren = sibling.children;
    for (var j = children.length; j > 0; j--) {
    	let sib = sibChildren[0].cloneNode(true) as HTMLElement;
        sib.onmouseenter = function (event) {
            switchColor(event.target as HTMLElement);
        };
        sib.onmouseleave = function (event) {
            switchColor(event.target as HTMLElement);
        };
        element.append(sib);
        sibChildren[0].remove();
        let elem = children[0].cloneNode(true) as HTMLElement;
        elem.onmouseenter = function (event) {
            switchColor(event.target as HTMLElement);
        };
        elem.onmouseleave = function (event) {
            switchColor(event.target as HTMLElement);
        };
        sibling.append(elem);
        children[0].remove();
    }
}
function switchColor(element: HTMLElement) {
    let col = element.parentElement.style.color;
    element.parentElement.style.color = element.parentElement.style.backgroundColor;
    element.parentElement.style.backgroundColor = col;
}

let body = new ElemBuilder();
body.style.textAlign = "center";
body.style.verticalAlign = "middle";
body.style.fontSize = "16pt";
body.style.margin = "auto";
body.element.innerHTML = "";
let styles = body.appendNewElement("style");
styles.append(`
p{
    width:max-content;
    margin: auto;
}
div{
    margin: auto;
    box-sizing: border-box;
}
.empty{
}
.rotate > p{
    transform: rotate(90deg);
    transform-origin: left bottom;
    margin: 30px 0;
}
`)

let header = body.appendNewElement('div');
header.setHeight("125px")
    .setBorder()
    .setWidth("900px")
    .setStyle("color", "red")
    .appendElemSize()
    .prependNewElement('p')
    .append("Header")
    .appendNewElement("br");


let subHeader = body.appendNewElement('div');
subHeader.setHeight("30px")
    .setWidth("900px")
    .setEmpty();

let horizontal = body.appendNewElement('div');
horizontal.setHeight("35px")
    .setBorder()
    .setWidth("900px")
    .setStyle("color", "blue")
    .appendElemSize()
    .prependNewElement('p')
    .append("Horizontal menu")
    .appendNewElement("br");

let subNav = body.appendNewElement('div');
subNav.setHeight("30px")
    .setWidth("900px")
    .setStyle('backgroundColor', 'white')
    .setEmpty();

let composeHeight = "500px";
let main = body.appendNewElement('div');
main.setHeight(composeHeight)
    .setWidth("612px")
    .setStyle('display', 'inline-block')
    .setStyle('color', 'green')
    .setBorder()
    .appendElemSize()
    .prependNewElement('p')
    .append('Main menu');

let subMain = body.appendNewElement('div');
subMain.setHeight(composeHeight)
    .setWidth("30px")
    .setStyle('display', 'inline-block')
    .addClass("rotate")
    .setEmpty();

let side = body.appendNewElement('div');
side.setHeight(composeHeight)
    .setWidth("266px")
    .setStyle('display', 'inline-block')
    .setStyle('color', 'blue')
    .setBorder()
    .appendElemSize()
    .prependNewElement('p')
    .append('Side bar');

let subCompose = body.appendNewElement('div');
subCompose.setHeight("30px")
    .setWidth("900px")
    .setEmpty();

let footer = body.appendNewElement('div');
footer.setHeight("190px")
    .setBorder()
    .setWidth("900px")
    .setStyle("color", "red")
    .appendElemSize()
    .prependNewElement('p')
    .append("Footer");