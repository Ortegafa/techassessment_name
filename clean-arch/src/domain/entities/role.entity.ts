export class Role {
  constructor(
    public readonly roleId: number | null,
    public readonly name: 'Admin' | 'Doctor' | 'Nurse' | 'Patient',
  ) {}
}