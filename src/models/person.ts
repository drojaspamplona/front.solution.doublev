export interface Person {
    idPerson: number;
    firstName: string;
    lastName: string;
    identificationNumber: string;
    email: string;
    identificationType: string;
}

export interface VwPerson extends Person {
    creationDate: string;
    fullIdentification: string;
    fullName: string;
}