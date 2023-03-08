export class DataStructure {
    name;
    isCompleted;
    id;

    constructor(name : string , isCompleted : boolean = false, id ?: number) {
        this.name = name,
        this.isCompleted = isCompleted,
        this.id = id
    }
}

