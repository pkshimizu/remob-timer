export enum MemberRole {
  Expert = 1,
  Navigator = 2,
}

export interface Member {
  id: string
  role: MemberRole
  name: string
}
