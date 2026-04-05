import app from "./app";

// Start the server

const bootstrap = () => {
	try {
		app.listen(5050, () => {
			console.log(`Server is running on http://localhost:5050`);
		});
	} catch (error) {
		console.error("Failed to load server", error);
	}
};

bootstrap();
