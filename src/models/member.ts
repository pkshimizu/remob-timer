export enum MemberType {
  Expert,
  Navigator,
  Driver,
}

export class Member {
  type: MemberType = MemberType.Navigator
  name: string

  constructor(name: string) {
    this.name = name
  }
}
