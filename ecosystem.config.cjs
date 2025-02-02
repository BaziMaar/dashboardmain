module.exports = {
    apps: [
        {
            name: "dashboard-3002",
            script: "npx",
            args: "serve -s build -l 3002",
            interpreter: "none", // Ensures PM2 runs the npx command directly
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};