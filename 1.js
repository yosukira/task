const areaA = document.getElementById("areaA");
const areaB = document.getElementById("areaB");
const areaC = document.getElementById("areaC");

let aCircles = []; // A 区域内的圆

function createCircle(color) {
    const circle = document.createElement("div");
    circle.classList.add("circle", color);
    let count = 0; // 点击次数
    circle.addEventListener("click", () => {
        count++;
        if (count === 1) {
            circle.classList.remove("white");
            circle.classList.add("green");
        } else if (count === 2) {
            circle.classList.remove("green");
            circle.classList.add("yellow");
        } else if (count === 3) {
            circle.classList.remove("yellow");
            circle.classList.add("white");
            count = 0;
        }
        setAreaBCircle();
    });
    return circle;
}

function renderAreaA() {
    for (let i = 0; i < 5; i++) {
        const circle = createCircle("white");
        areaA.appendChild(circle);
        aCircles.push(circle);
    }
}

function setAreaBCircle() {
    const greenCount = aCircles.filter((circle) =>
        circle.classList.contains("green")
    ).length;
    const yellowCount = aCircles.filter((circle) =>
        circle.classList.contains("yellow")
    ).length;

    // 当 A 区域中圆都是白色时，B 区域和 C 区域中都没有圆
    if (greenCount === 0 && yellowCount === 0) {
        areaB.innerHTML = "";
        areaC.innerHTML = "";
        return;
    }

    // 当 A 区域中点亮一个绿色圆时，B 和 C 区域会同时出现一个绿色圆
    if (greenCount === 1 && yellowCount === 0) {
        areaB.innerHTML = "";
        areaC.innerHTML = "";
        const circle = createCircle("green");
        areaB.appendChild(circle);
        areaC.appendChild(circle.cloneNode());
        return;
    }

    // 当 A 区域中点亮一个黄色圆时，B 区域会出现一个黄色圆，C 区域会出现一个灰色圆
    if (greenCount === 0 && yellowCount === 1) {
        areaB.innerHTML = "";
        areaC.innerHTML = "";
        const yellowCircle = createCircle("yellow");
        const grayCircle = createCircle("gray");
        areaB.appendChild(yellowCircle);
        areaC.appendChild(grayCircle);
        return;
    }

    // 如果 A 区域同时点亮多个圆，那么用户 B 和用户 C 也会展示同样数量的圆
    if (greenCount > 1 || yellowCount > 1) {
        areaB.innerHTML = "";
        areaC.innerHTML = "";
        for (let i = 0; i < greenCount; i++) {
            const circle = createCircle("green");
            areaB.appendChild(circle);
            areaC.appendChild(circle.cloneNode());
        }
        for (let i = 0; i < yellowCount; i++) {
            const yellowCircle = createCircle("yellow");
            const grayCircle = createCircle("gray");
            areaB.appendChild(yellowCircle);
            areaC.appendChild(grayCircle);
        }
    }
}

renderAreaA();
