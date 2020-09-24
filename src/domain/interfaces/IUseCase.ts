export default interface IUseCase<T = any, R = any> {
  execute(payload: T): Promise<R>;
}
