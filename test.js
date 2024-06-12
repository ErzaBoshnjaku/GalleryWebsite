(async () => {
    // Create a new application
    const app = new PIXI.Application({
        backgroundAlpha: 0,
        resizeTo: window,
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.view);

    // Create a new loader instance
    const loader = new PIXI.Loader();

    // Load the bunny texture
    loader
        .add("https://pixijs.com/assets/bunny.png")
        .load((loader, resources) => {
            // Create a bunny Sprite
            const bunny = new PIXI.Sprite(
                resources["https://pixijs.com/assets/bunny.png"].texture
            );

            // Center the sprite's anchor point
            bunny.anchor.set(0.5);

            // Move the sprite to the center of the screen
            bunny.x = app.screen.width / 2;
            bunny.y = app.screen.height / 2;
            bunny.width = 150;
            bunny.height = 150;

            app.stage.addChild(bunny);

            // Create a message text
            const message = new PIXI.Text('楽しんでいただければ幸いです-Hope u enjoyed it!', {
                fontFamily: 'Arial',
                fontSize: 48,
                fill: 0xffffff,
                align: 'center'
            });

            message.anchor.set(0.5);
            message.x = bunny.x;  // Align with bunny's x position
            message.y = bunny.y;  // Align with bunny's y position

            app.stage.addChild(message);

            // Listen for animate update to rotate the bunny
            app.ticker.add((delta) => {
                bunny.rotation += 0.1 * delta;
            });

            // Animate the message
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
})();