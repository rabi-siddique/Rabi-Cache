import express, { Express, Request, Response } from 'express';
import { ICommandExecutor } from './Executor';
import { Operations, SuccessMessages } from './enums/enums';
import { handleErrorsForIncomingRequests } from './decorators/Decorators';

export class Server {
  private app: Express;
  private port: number;
  private executor: ICommandExecutor;

  constructor(executor: ICommandExecutor) {
    this.executor = executor;
    this.port = Number(process.env.PORT) || 8080;
    this.app = express();
    this.setUpMiddleWare();

    // Bindings
    this.AddCacheData = this.AddCacheData.bind(this);
    this.GetCacheData = this.GetCacheData.bind(this);
    this.UpdateCacheData = this.UpdateCacheData.bind(this);
    this.DeleteCacheData = this.DeleteCacheData.bind(this);

    // Setting up the routes after ensuring proper binding
    // As doing so beforehand would result in incorrect handler functions lacking necessary binding.
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
    this.app.get('/data/:key', this.GetCacheData);
    this.app.delete('/data/:key', this.DeleteCacheData);
    this.app.post('/data', this.AddCacheData);
    this.app.put('/data', this.UpdateCacheData);
  }

  @handleErrorsForIncomingRequests
  public GetCacheData(req: Request, res: Response): void {
    const { key } = req.params;
    const value = this.executor.performOperation(Operations.GET, key);
    res
      .status(200)
      .send({ data: { key: value }, message: SuccessMessages.Get });
  }
  @handleErrorsForIncomingRequests
  public DeleteCacheData(req: Request, res: Response): void {
    const { key } = req.params;
    this.executor.performOperation(Operations.DELETE, key);
    res.status(200).send(SuccessMessages.Deletion);
  }
  @handleErrorsForIncomingRequests
  public AddCacheData(req: Request, res: Response): void {
    const { pair } = req.body;
    const { key, value } = this.getKeyAndValue(pair);
    this.executor.performOperation(Operations.INSERT, key, value);
    res.status(200).send(SuccessMessages.Insertion);
  }

  @handleErrorsForIncomingRequests
  public UpdateCacheData(req: Request, res: Response): void {
    const { pair } = req.body;
    const { key, value } = this.getKeyAndValue(pair);
    this.executor.performOperation(Operations.UPDATE, key, value);
    res.status(200).send(SuccessMessages.Update);
  }

  private getKeyAndValue(obj: { [key: string]: unknown }): {
    key: string;
    value: unknown;
  } {
    const key: string = Object.keys(obj)[0];
    const value: unknown = obj[key];
    return { key, value };
  }
}
