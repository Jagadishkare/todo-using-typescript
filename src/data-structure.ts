export class DataStructure {
    name;
    isCompleted;
    id;

    constructor(name : string , isCompleted? : boolean, id? : string) {
        this.name = name,
        this.isCompleted = isCompleted,
        this.id = id
    }
}

