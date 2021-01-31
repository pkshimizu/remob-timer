export enum MemberType {
  Expert,
  Navigator,
}

export class Member {
  type: MemberType = MemberType.Navigator
  name: string

  constructor(name: string) {
    this.name = name
  }
}
