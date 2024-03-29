import express, { Express } from 'express';
import { ICommandExecutor } from './Executor';
import { ErrorMessages, Operations, SuccessMessages } from './enums/enums';
import { handleErrorsForIncomingRequests } from './decorators/Decorators';
import { Server as HttpServer } from 'http';

export interface IServerInterface {
  start(): Promise<void>;
  stop(): void;
  GetCacheData(req: express.Request, res: express.Response): void;
  DeleteCacheData(req: express.Request, res: express.Response): void;
  AddCacheData(req: express.Request, res: express.Response): void;
  UpdateCacheData(req: express.Request, res: express.Response): void;
}
export class Server implements IServerInterface {
  private app: Express;
  private port: number;
  private executor: ICommandExecutor;
  private serverInstance: HttpServer | null;

  constructor(executor: ICommandExecutor) {
    this.executor = executor;
    this.port = Number(process.env.PORT) || 8080;
    this.app = express();
    this.setUpMiddleWare();
    this.serverInstance = null;

    // Bindings
    this.AddCacheData = this.AddCacheData.bind(this);
    this.GetCacheData = this.GetCacheData.bind(this);
    this.UpdateCacheData = this.UpdateCacheData.bind(this);
    this.DeleteCacheData = this.DeleteCacheData.bind(this);

    // Setting up the routes after ensuring proper binding
    // As doing so beforehand would result in incorrect handler functions lacking necessary binding.
    this.setupRoutes();
  }

  public async start(): Promise<void> {
    this.serverInstance = await this.app.listen(this.port);
    console.log(`Server is listening on port ${this.port}`);
  }

  public stop(): void {
    if (this.serverInstance !== null) {
      this.serverInstance.close();
      console.log('Server stopped');
    }
  }

  private validateRequestData(req: express.Request, res: express.Response, next: express.NextFunction) {
    if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length === 0) {
      return res.status(400).send(ErrorMessages.BadRequestPostAndUpdate);
    }

    next();
  }
  private setUpMiddleWare(): void {
    this.app.use(express.json());
    this.app.use('/data', this.validateRequestData);
  }

  private setupRoutes(): void {
    this.app.get('/data/:key', this.GetCacheData);
    this.app.delete('/data/:key', this.DeleteCacheData);
    this.app.post('/data', this.AddCacheData);
    this.app.put('/data', this.UpdateCacheData);
  }

  @handleErrorsForIncomingRequests
  public GetCacheData(req: express.Request, res: express.Response): void {
    const { key } = req.params;
    const value = this.executor.performOperation(Operations.GET, key);
    res.status(200).send({ data: { key: value }, message: SuccessMessages.Get });
  }

  @handleErrorsForIncomingRequests
  public DeleteCacheData(req: express.Request, res: express.Response): void {
    const { key } = req.params;
    this.executor.performOperation(Operations.DELETE, key);
    res.status(200).send(SuccessMessages.Deletion);
  }
  @handleErrorsForIncomingRequests
  public AddCacheData(req: express.Request, res: express.Response): void {
    const { key, value } = this.getKeyAndValue(req.body);
    this.executor.performOperation(Operations.INSERT, key, value);
    res.status(200).send(SuccessMessages.Insertion);
  }

  @handleErrorsForIncomingRequests
  public UpdateCacheData(req: express.Request, res: express.Response): void {
    const { key, value } = this.getKeyAndValue(req.body);
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
