export class AddAddressToUserCommand {
  constructor(
    public readonly address: string,
    public readonly number: number,
    public readonly neighborhood: string,
    public readonly state: string,
    public readonly userId: string,
  ) {}
}
