import App from './App';

enum ExitedApplicationStatus {
  FAILURE = 1,
  SUCCESS = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error({
    msg: `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
  });

  throw reason;
});

process.on('uncaughtException', error => {
  console.error({ msg: `App exiting due to an unhandled exception: ${error}` });

  process.exit(ExitedApplicationStatus.FAILURE);
});

(async () => {
  try {
    const app = new App();
    app.validateEnvVariables();
    await app.initApplication();
    app.initServer();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.forEach((signal: string) => {
      process.on(
        signal,
        async (): Promise<void> => {
          try {
            await app.closeApplication();
            console.info({ msg: 'App exited with success' });
            process.exit(ExitedApplicationStatus.SUCCESS);
          } catch (error) {
            console.info({ msg: 'App exited with error' });
            process.exit(ExitedApplicationStatus.FAILURE);
          }
        },
      );
    });
  } catch (error) {
    console.error({ msg: `App exited with error: ${error}` });
    process.exit(ExitedApplicationStatus.FAILURE);
  }
})();
