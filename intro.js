$(document).ready(() => {
    const AMOUNT = 2000;
    const COLOR = 0xffffff;
    const PIXI = window.PIXI;
    const canvas = document.getElementById("banner_canvas");

    var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
        view: canvas,
        antialias: true,
        transparent: true
    });

    const drops = new PIXI.Container();
    app.stage.addChild(drops);

    const randomColor = () =>
        [0xff3366, 0x2ec4b6, 0x20a4f3][
            Math.floor(Math.random() * 3)
        ];

    const genParticles = (texture) =>
        new Array(AMOUNT).fill().map(p => {
            var p = new PIXI.Sprite(texture);
            let size = Math.floor(Math.random() * 6) + 3;
            p.sz = 1.7 * size;
            p.width = p.sz;
            p.height = p.sz;
            p.x = Math.random() * window.innerWidth;
            p.y = Math.random() * window.innerHeight;
            p.offset = Math.random() * 2 * Math.PI;
            p.vx = 2 / size;
            p.vy = 0;
            p.alpha = 20 / (size * size);
            p.tint = randomColor();
            function randomColor() {
                const colors = [0x6B8A7A, 0xEEF7FF, 0x535C91, 0x7D0A0A]; // #6B8A7A, #EEF7FF, #535C91, #7D0A0A
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            drops.addChild(p);
            return p;
        });

    const p = new PIXI.Graphics();
    p.beginFill(COLOR);
    p.drawCircle(0, 0, 100);
    p.endFill();

    const baseTexture = app.renderer.generateTexture(p);
    let particles = genParticles(baseTexture);

    var time = 0;

    app.ticker.add(function (delta) {
        time += delta;
        if (
            app.renderer.height !== innerHeight ||
            app.renderer.width !== innerWidth
        ) {
            app.renderer.resize(innerWidth, innerHeight);
            drops.removeChildren();
            particles = genParticles(baseTexture);
        }
        for (let p of particles) {
            p.x += delta * p.vx;
            p.y += delta * p.vy;
            p.width = (Math.sin(time / 100 + p.offset) + 1) * p.sz;
            p.height = (Math.sin(time / 100 + p.offset) + 1) * p.sz;
            if (p.x >= window.innerWidth + 20) {
                p.x = -20;
            }
        }
        app.renderer.render(drops);
    });

    const message = new PIXI.Text('ヒライスへようこそ！-Welcome to Hiraeth!', {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0xffffff,
        align: 'center'
    });

    message.anchor.set(0.5);
    message.x = app.renderer.width / 2;
    message.y = app.renderer.height / 2;

    app.stage.addChild(message);

    const animateMessage = () => {
        message.scale.set(1);
        message.alpha = 1;
        app.ticker.add((delta) => {
            message.scale.x += 0.01 * delta;
            message.scale.y += 0.01 * delta;
            message.alpha -= 0.01 * delta;
            if (message.alpha <= 0) {
                app.ticker.remove(animateMessage);
            }
        });
    };

    animateMessage();
});