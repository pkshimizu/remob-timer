export enum MemberType {
  Expert,
  Navigator,
}

export interface Member {
  id: string
  type: MemberType
  name: string
}
