import express, { Express, Request, Response } from 'express';
import { ICommandExecutor } from './Executor';
import { Operations, SuccessMessages } from './enums/enums';

export class Server {
  private app: Express;
  private port: number;
  private executor: ICommandExecutor;

  constructor(executor: ICommandExecutor) {
    this.executor = executor;
    this.port = Number(process.env.PORT) || 8080;
    this.app = express();
    this.setUpMiddleWare();
    this.setupRoutes();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private setUpMiddleWare(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.get('/data/:key', this.getCacheData);
    this.app.delete('/data/:key', this.DeleteCacheData);
    this.app.post('/data', this.AddCacheData);
    this.app.put('/data', this.UpdateCacheData);
  }

  public getCacheData = (req: Request, res: Response): void => {
    const { key } = req.params;
    const value = this.executor.performOperation(Operations.GET, key);
    res
      .status(200)
      .send({ data: { key: value }, message: SuccessMessages.Get });
  };
  public DeleteCacheData = (req: Request, res: Response): void => {
    const { key } = req.params;
    this.executor.performOperation(Operations.DELETE, key);
    res.status(200).send(SuccessMessages.Deletion);
  };
  public AddCacheData = (req: Request, res: Response): void => {
    const { key, value } = req.body;
    this.executor.performOperation(Operations.INSERT, key, value);
    res.status(200).send(SuccessMessages.Insertion);
  };
  public UpdateCacheData = (req: Request, res: Response): void => {
    const { key, value } = req.body;
    this.executor.performOperation(Operations.UPDATE, key, value);
    res.status(200).send(SuccessMessages.Update);
  };
}
